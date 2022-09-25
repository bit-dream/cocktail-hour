import psycopg2
import json
import datetime

class Database():

    def __init__(self, dbname: str, user: str, password: str, host = 'localhost'):
        self.user = user
        self.password = password
        self.dbname = dbname
        self.host = host

        self.conn = self.connect(self.host, self.user, self.password, self.dbname)
        self.db = self.conn.cursor()

    def connect(self, host: str, user: str, password: str, name: str):
        conn = psycopg2.connect(
            host=host,
            database=name,
            user=user,
            password=password
        )
        return conn

    def set_table(self, table_name):
        self.table = table_name

    def get_all_rows(self):
        self.db.execute(f'SELECT * FROM {self.table}')
        return self.db.fetchall()

    def add_cocktail(self, search, ingredients):
        
        self.db.execute(
        f"""
        INSERT INTO {self.table} (search, ingredients, t)
        VALUES ('{search}', '{ingredients}', '{datetime.datetime.now()}'); 
        """
        )
        self.conn.commit()
        
    def get_cocktail(self, search):
        self.db.execute(f"SELECT * FROM {self.table} WHERE search = '{search}'")
        result = self.db.fetchone()
        return result

    def update_cocktail(self, hits, search, ingredients, timestamp):
        self.db.execute(
        f"""
        UPDATE {self.table}
        SET hits = {hits}, ingredients = '{ingredients}', last_query = '{timestamp}'
        WHERE search = '{search}'; 
        """
        )