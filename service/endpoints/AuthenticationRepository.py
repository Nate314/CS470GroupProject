from helpers import Database, JWTHelper, Config
import time

# Repositories retrieve data from the database
class AuthenticationRepository:

    # initialize AuthenticationRepository
    def __init__(self):
        self.db = Database()
    
    def loginClient(self, token, username, password):
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
        print('loginBot')
        print(token)
        print(decodedToken)
        print('loginBot')
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
