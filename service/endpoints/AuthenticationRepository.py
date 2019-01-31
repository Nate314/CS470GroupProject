from sql import MySQL
from jwthelper import JWTHelper
import time

# Repositories retrieve data from the database
class AuthenticationRepository:

    # initialize AuthenticationRepository
    def __init__(self):
        self.mysql = MySQL('localhost', 3306, 'root', 'root', 'cs470groupproject')
    
    def login(self, username, password):
        if self.mysql.containsNoMaliciousCharacters(username):
            query = 'SELECT * FROM Users WHERE Username = \'' + username.upper() + '\''
            print(query)
            dt = self.mysql.getDataTable(query)
            if len(dt.getRows()) == 1:
                # TODO Don't store the password as plain text in the database
                if dt.getRows()[0]['Password'] == password:
                    jwt = JWTHelper('secretkey')
                    now = round(time.time())
                    payload = {
                        'iat': now,
                        'exp': now + 60
                    }
                    resp = {
                        'jwt': jwt.encode(payload)
                    }
                    return resp
        return False
