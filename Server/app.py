from flask import Flask, send_from_directory,request
from flask import jsonify

import sqlite3
#from sklearn.decomposition import PCA
#from analysis.bert_cluster import get_embeddings
import json

from flask_cors import CORS






app = Flask(__name__, static_folder='./dist')
CORS(app, resources={r"/data": {"origins": "*"}})
CORS(app, resources={r"/update_paper": {"origins": "*"}})

app.config['DATABASE'] = './DB/database.sqlite'  # Replace with your SQLite database file path

#allColumns = ['articleID', 'Abstract', 'ArticleTitle', 'DOI', 'JournalTitle', 'Day',
#       'Month', 'Year', 'Authors', 'Keywords', 'Groups', 'data', 'PCA_Comp1',
#       'PCA_Comp2', 'Kmeans_Cluster']



def get_db():
    db = getattr(app, '_database', None)
    if db is None:
        db = app._database = sqlite3.connect(app.config['DATABASE'])
    return db

def close_db(exception=None):
    db = getattr(app, '_database', None)
    if db is not None:
        db.close()


def read_from_db():
    db = get_db()
    cur = db.cursor()
    # cur.execute("SELECT * FROM papers")
    cur.execute("SELECT articleID,\
                         Abstract,\
                         ArticleTitle,\
                         DOI,\
                         JournalTitle,\
                         Day,\
                         Month,\
                         Year,\
                         Authors,\
                         Keywords,\
                         Groups,\
                        PCA_Comp1,\
                        PCA_Comp2,\
                        Kmeans_Cluster\
                         FROM papers")
    


    #cur.execute("SELECT articleID,\            0
    #                     Abstract,\            1
    #                     ArticleTitle,\        3
    #                     DOI,\                 4
    #                     JournalTitle,\        5
    #                     Day,\                 6
    #                     Month,\               7
    #                     Year,\                8
    #                     Authors,\             9
    #                     Keywords,\            10
    #                     Groups,\              11
    #                     PCA_Comp1,\           12
    #                     PCA_Comp2,\           13
    #                     Kmeans_Cluster\       14
    #                     FROM papers")


    #columns = [col[0] for col in cur.description]  # Get column names
    rows = cur.fetchall()
    resp_data = []

    for r in rows:
        resp_data.append({
            "articleID":r[0], 
            "Abstract":r[1], 
            "ArticleTitle":r[2], 
            "DOI":r[3], 
            "JournalTitle":r[4], 
            "Day":r[5], 
            "Month":r[6], 
            "Year":r[7], 
            "Authors":r[8], 
            "Keywords":r[9], 
            "Groups":r[10],
            "PCA_Comp1":r[11],
            "PCA_Comp2":r[12],
            "Kmeans_Cluster":r[13]

        
        })
    
    #return [{col: [row[i] for row in rows] for i, col in enumerate(columns)} for row in rows]
    return {"data":resp_data}




def read_from_db_Cols():
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT articleID,Abstract, ArticleTitle FROM papers")
    rows = cur.fetchall()
    return rows




def write_to_db():
    # Example of writing data to SQLite
    cursor = get_db().cursor()
    cursor.execute("INSERT INTO your_table (column1, column2) VALUES (?, ?)", ('value1', 'value2'))
    get_db().commit()
    return 'Data written to SQLite'

def write_dict_db(data):
    cursor = get_db().cursor()
    columns = ', '.join(data.keys())
    placeholders = ', '.join(['?'] * len(data))
    query = f"INSERT INTO papers ({columns}) VALUES ({placeholders})"
    cursor.execute(query, list(data.values()))
    get_db().commit()
    return 'Data written to SQLite'


def update_record(artcleID,column,value):
    cursor = get_db().cursor()
    query = f"UPDATE papers SET {column} = ? WHERE articleID = ?"
    cursor.execute(query, (value, artcleID))
    get_db().commit()
    return 'Data updated'

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/data')
def get_data():
    return jsonify(read_from_db()) #read_from_db


# UPDATE PAPER
@app.route('/update_paper', methods=['POST'])
def update_paper():
    data = request.json  # Extract JSON data from the request
    # Write the updated paper data to the database
    # Example:
    # write_to_db(data)
    
    #print(data[0])
    for row in data:
        articleID = row['articleID']
        GroupData = row['Groups']
        GroupData = ', '.join(str(item) for item in GroupData)
        GroupData = f"[{GroupData}]"
        print(GroupData)
        update_record(articleID,'Groups',GroupData)

    return jsonify({'message': 'Paper updated successfully'})


@app.route('/clusters')
def calculate_clusters():
    ids = []
    document = []
    for row in read_from_db_Cols():
        document.append(row[1]+" "+row[2])
        ids.append(row[0])

    PCA_Comps = get_embeddings(document)
    
    cursor = get_db().cursor()
    for i,id in enumerate(ids):
        cursor.execute("UPDATE papers SET PCA_Comp1 = ?, PCA_Comp2 = ? WHERE articleID = ?", (str(round(PCA_Comps[i][0],4)), str(round(PCA_Comps[i][1],4)), id))
        print("UPDATE papers SET PCA_Comp1 = ?, PCA_Comp2 = ? WHERE articleID = ?", (str(round(PCA_Comps[i][0],4)), str(round(PCA_Comps[i][1],4)), id))
        get_db().commit()


    return {'data': "hello"}


@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory(app.static_folder + '/assets', filename)

if __name__ == "__main__":
    app.run(host = '0.0.0.0', port=5050, debug=True)
