from helpers import Database
import datetime

# Repositories retrieve data from the database
class DTORepository:

    # initialize DTORepository
    def __init__(self):
        self.db = Database()
    
    def __getKeys(self, entity):
        props = []
        for key in entity.keys():
            props.append(key)
        return props

    # returns the table passed
    def selectAll(self, table):
        dt = self.db.select(['*'], table)
        print('asdf')
        print(str(dt))
        print('asdf')
        return eval(str(dt))
    
    # retrieve information for the get id method on the controller
    def insert(self, table, entity):
        props = self.__getKeys(entity)
        return self.db.insertOne(table, props, entity)
    
    def select(self, table, IDColumn, ID):
        dt = self.db.select(['*'], table, f"{IDColumn} = %s", [ID])
        print(str(dt))
        return eval(str(dt))
    
    def update(self, table, entity, where = '', values = []):
        props = self.__getKeys(entity)
        return self.db.update(table, props, entity, where, values)
    
    def delete(self, table, where = '', values = []):
        dt = self.db.delete(table, where, values)
        return eval(str(dt))
