import pymysql
import datetime

# used to interact with the database
class Database(object):

    #PUBLIC
    # initialize Database
    def __init__(self):
        self.host = 'localhost'
        self.port = 3306
        self.user = 'root'
        self.passwd = 'root'
        self.db = 'DiscordBot'
        print('Database object created')

    #PRIVATE
    # gets a database connection
    def __getConnection(self):
        return pymysql.connect(host = self.host,
            port = self.port, user = self.user,
            passwd = self.passwd, db = self.db)

    #PRIVATE
    # executes a query on this database
    def execute(self, query, parameters):
        print(query)
        conn = self.__getConnection()
        cur = conn.cursor()
        cur.execute(query, parameters)
        cur.close()
        conn.close()
        return cur
    
    #PUBLIC
    # check for malicious characters before running a query
    def containsNoMaliciousCharacters(self, string):
        for c in string:
            if c in '~`!@#$%^&*()_+-=[]{}\\|;:\'"<>?,./':
                return False
        return True

    #PUBLIC
    # returns DataTable for query
    def getDataTable(self, query):
        cur = self.execute(query)
        dt = DataTable(cur)
        return dt
    
    #PUBLIC
    # returns DataTable for select
    def select(self, columns: list, table: str, where = ''):
        if len(columns) > 0:
            query = 'SELECT ' + ', '.join(columns) + ' FROM ' + table
            query += ' WHERE ' + where if where != '' else ''
            query += ';'
            dt = self.getDataTable(query)
            return dt
        else:
            return False
    
    #PUBLIC
    # returns DataTable for inserting one item
    def insertOne(self, table: str, props: list, entity):
        return self.insert(table, props, [entity])
    
    #PUBLIC
    # returns DataTable for inserting multiple items
    def insert(self, table: str, props: list, entities: list):
        try:
            query = 'INSERT INTO ' + table + ' '
            query += '(' + ', '.join(props) + ')'
            query += ' VALUES '
            for entity in entities:
                query_entity = '('
                for key in props:
                    if type(entity[key]) == type('str'):
                        query_entity += '\'' + entity[key] + '\', '
                    else:
                        query_entity += str(entity[key]) + ', '
                query_entity = query_entity[0:-2] + '),'
                query += query_entity
            query = query[:-1] + ';'
            self.execute(query)
            return True
        except:
            return False
    
    #PUBLIC
    # returns DataTable for updating one to many items
    def update(self, table: str, props: list, entity, where: str):
        try:
            query = 'UPDATE ' + table + ' SET '
            for prop in props:
                if type(entity[prop]) == type('str'):
                    query += prop + ' = \'' + entity[prop] + '\', '
                else:
                    query += prop + ' = ' + str(entity[prop]) + ', '
            query = query[0:-2] + ' WHERE ' + where
            query += ';'
            self.execute(query)
            return True
        except:
            return False
    
    #PUBLIC
    # returns DataTable for deleting one to many items
    def delete(self, table: str, where: str):
        try:
            dt = self.select('*', table, where)
            query = 'DELETE FROM ' + table + ' WHERE ' + where
            query += ';'
            self.execute(query)
            return dt
        except:
            return False

# used to interface with returned datatables from the database
class DataTable(object):

    #PUBLIC
    # initialize DataTable
    def __init__(self, cur):
        self.columns = [column[0] for column in cur.description]
        self.rows = []
        for row in cur:
            self.rows.append(DataRow(self.columns, row))
    
    #PUBLIC
    # get list of column titles for this DataTable
    def getColumns(self):
        return self.columns
    
    #PUBLIC
    # get list of DataRow objects in this DataTable
    def getRows(self):
        return self.rows
    
    #PUBLIC
    # convert DataTable to json list of DatRow objects
    def __str__(self):
        result = "[\n"
        for i in range(len(self.rows)):
            result += str(self.rows[i])
            if i < len(self.rows) - 1:
                result += ",\n"
        return result + "\n]"

class DataRow(object):

    #PUBLIC
    # initialize DataRow
    def __init__(self, columns, row):
        self.dictionary = {}
        if len(columns) == len(row):
            for i in range(len(columns)):
                self.dictionary.update({columns[i]: row[i]})
        else:
            raise Exception('error creating datarow. number of columns does not match number of rows.')
    
    #PUBLIC
    # return indexed item like this // dr['Column']
    def __getitem__(self, key):
        return self.dictionary[key]
    
    #PUBLIC
    # return DataRow as json
    def __str__(self):
        result = {}
        for key in self.dictionary.keys():
            result[key] = str(self.__getitem__(key))
        return str(result)

# ---RESOURCES---
#https://stackoverflow.com/questions/51468059/mysql-package-for-python-3-7
#https://stackoverflow.com/questions/7942669/create-a-python-object-that-can-be-accessed-with-square-brackets
#https://stackoverflow.com/questions/2052390/manually-raising-throwing-an-exception-in-python
# ---RESOURCES---

# example of how to use select, insertone, update, delete functions
if __name__ == '__main__':
    db = Database()
    username = 'nate314'
    malicious_nick_name = '\'; DROP TABLE discordusers; --'
    print(str(DataTable(db.execute('SELECT * FROM discordusers WHERE UserName = %s', (malicious_nick_name)))))
    print(str(DataTable(db.execute('SELECT * FROM discordusers;', ()))))
