import sqlite3
import json

def sanitize_value(value):
    # Remove forward slashes and backslashes
    return ''.join(c for c in str(value) if c.isalnum() or c == '_' or c not in '/\\')


def import_json_to_sqlite(json_file, db_file):
    # Read JSON data from file
    with open(json_file, 'r') as f:
        data = json.load(f)
        data = data['data']

   
    # Connect to SQLite database
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()

    # Infer table schema from JSON data
    keys = set()
    for entry in data:
         keys.update(entry.keys())

    
 
 
    columns = ', '.join([f"{key} TEXT" for key in keys])
    print(columns)
    cursor.execute(f'''CREATE TABLE IF NOT EXISTS papers ({columns})''')
## 
    ## # Insert data into the table
    for entry in data:
        placeholders = ', '.join(['?'] * len(keys))
        values = [entry.get(key, None) for key in keys]
        sanitized_values = [sanitize_value(value) for value in values]
        cursor.execute(f'''INSERT INTO papers ({', '.join(keys)}) VALUES ({placeholders})''', sanitized_values)


 
    ## # Commit changes and close connection
    conn.commit()
    conn.close()          


json_file = 'data_json/data.json'
db_file = 'DB/database.db'
import_json_to_sqlite(json_file, db_file)
