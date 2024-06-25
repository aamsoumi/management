from flask import Flask, send_from_directory, request, jsonify,render_template
from flask_cors import CORS
from db_functions import read_from_db, update_record
import pandas as pd
import json

### ML model imports
from transformers import BertTokenizer, BertModel
import torch
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity




app = Flask(__name__, static_folder='./dist')
CORS(app, resources={r"/data": {"origins": "*"}})
CORS(app, resources={r"/update_paper": {"origins": "*"}})
CORS(app)

app.config['DATABASE'] = './DB/database.sqlite'  # Replace with your SQLite database file path

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/data')
def get_data():
    return jsonify(read_from_db(app))

@app.route('/update_paper', methods=['POST'])
def update_paper():
    data = request.json
    for row in data:
        articleID = row['articleID']
        GroupData = row['Groups']
        GroupData = ', '.join(str(item) for item in GroupData)
        GroupData = f"[{GroupData}]"
        update_record(app, articleID, 'Groups', GroupData)
    return jsonify({'message': 'Paper updated successfully'})

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory(app.static_folder + '/assets', filename)


### ML Section of the server
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')
def get_bert_embeddings(text):
    inputs = tokenizer(text, return_tensors='pt', padding=True, truncation=True, max_length=512)
    outputs = model(**inputs)
    return outputs.last_hidden_state[:,0,:].detach().numpy()
@app.route('/clusters')
def get_cluster():

    json_data = read_from_db(app)
    df = pd.DataFrame(json_data['data'])
    df['data'] = df['ArticleTitle'] + df['Abstract']
    documents = list(df['data'])
    
    # Convert documents to embeddings
    embeddings = np.vstack([get_bert_embeddings(doc) for doc in documents])
    # Calculate cosine similarity
    similarity_matrix = cosine_similarity(embeddings)
    # Round the similarity values to 2 digits
    # similarity_matrix_rounded = np.round(similarity_matrix, 2)
    similarity_matrix_rounded = []
    for row in similarity_matrix:
        for element in row:
            similarity_matrix_rounded.append(str(element)[:4])

    return {'data': similarity_matrix_rounded}


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5050, debug=True,threaded=False)
