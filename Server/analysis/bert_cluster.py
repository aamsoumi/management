from transformers import BertTokenizer
from transformers import BertModel
import numpy as np
from sklearn.decomposition import PCA

# Initialize BERT tokenizer and model
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

def get_bert_embeddings(text):
    inputs = tokenizer(text, return_tensors='pt', padding=True, truncation=True, max_length=512)
    outputs = model(**inputs)
    return outputs.last_hidden_state[:,0,:].detach().numpy()

def get_embeddings(documents):
    documents = list(documents)
    embeddings = []
    embeddings = np.vstack([get_bert_embeddings(doc) for doc in documents])
    pca = PCA(n_components=2) 
    reduced = pca.fit_transform(embeddings)
    return reduced