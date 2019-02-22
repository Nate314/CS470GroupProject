from Database import Database
from jwthelper import JWTHelper
from Config import Config
import time

# Repositories retrieve data from the database
class AuthenticationRepository:

    # initialize AuthenticationRepository
    def __init__(self):
        self.db = Database()
    
    def loginClient(self, token, username, password):
        # this is how login would work if users were stored in the database
        '''
        if self.db.containsNoMaliciousCharacters(username):
            query = 'SELECT * FROM Users WHERE Username = \'' + username.upper() + '\''
            print(query)
            dt = self.db.getDataTable(query)
            if len(dt.getRows()) == 1:
                # TODO Don't store the password as plain text in the database
                if dt.getRows()[0]['Password'] == password:
        '''
        if token != '' or (username == 'username' and password == 'password'):
            validToken = False
            jwt = JWTHelper(Config.secretkey, 'HS256')
            if token != '':
                decodedToken = jwt.decode(token)
                if decodedToken != 'Token Expired':
                    validToken = True
            else:
                validToken = True
            if validToken:
                now = round(time.time())
                payload = {
                    'iat': now,
                    'exp': now + 60,
                    'client': 'angular'
                }
                resp = {
                    'jwt': jwt.encode(payload)
                }
                return resp
        return False
        # return False
    
    def loginBot(self, token):
        jwt = JWTHelper(Config.rsapublickey, 'RS256')
        decodedToken = jwt.decode(token)
        if decodedToken != 'Token Expired':
            jwt = JWTHelper(Config.secretkey, 'HS256')
            now = round(time.time())
            payload = {
                'iat': now,
                'exp': now + 60,
                'client': 'bot'
            }
            resp = {
                'jwt': jwt.encode(payload)
            }
            return resp
        else:
            return False
