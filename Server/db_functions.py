import sqlite3

def get_db(app):
    db = getattr(app, '_database', None)
    if db is None:
        db = app._database = sqlite3.connect(app.config['DATABASE'])
    return db

def close_db(app, exception=None):
    db = getattr(app, '_database', None)
    if db is not None:
        db.close()

def read_from_db(app):
    db = get_db(app)
    cur = db.cursor()
    cur.execute("SELECT articleID, Abstract, ArticleTitle, DOI, JournalTitle, Day, Month, Year, Authors, Keywords, Groups, PCA_Comp1, PCA_Comp2, Kmeans_Cluster FROM papers")
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
    return {"data":resp_data}

def read_from_db_Cols(app):
    db = get_db(app)
    cur = db.cursor()
    cur.execute("SELECT articleID, Abstract, ArticleTitle FROM papers")
    rows = cur.fetchall()
    return rows

def write_dict_db(app, data):
    cursor = get_db(app).cursor()
    columns = ', '.join(data.keys())
    placeholders = ', '.join(['?'] * len(data))
    query = f"INSERT INTO papers ({columns}) VALUES ({placeholders})"
    cursor.execute(query, list(data.values()))
    get_db(app).commit()
    return 'Data written to SQLite'

def update_record(app, articleID, column, value):
    cursor = get_db(app).cursor()
    query = f"UPDATE papers SET {column} = ? WHERE articleID = ?"
    cursor.execute(query, (value, articleID))
    get_db(app).commit()
    return 'Data updated'
