from helpers import Database, JWTHelper, Config
import time

# Repositories retrieve data from the database
class AuthenticationRepository:

    # initialize AuthenticationRepository
    def __init__(self):
        self.db = Database()
    
    def loginClient(self, token, username, password):
        if token != '' or (username == 'username' and password == 'password'):
            userID = ''
            validToken = False
            jwt = JWTHelper(Config.secretkey, 'HS256')
            if token != '':
                decodedToken = jwt.decode(token)
                if decodedToken != 'Token Expired':
                    validToken = True
                userID = dict(decodedToken)['DiscordUserID']
            else:
                validToken = True
            if validToken:
                now = round(time.time())
                payload = {
                    'iat': now,
                    'exp': now + Config.tokenlifetime,
                    'DiscordUserID': userID,
                    'client': 'angular'
                }
                resp = {
                    'jwt': jwt.encode(payload)
                }
                return resp
        return False
    
    def loginBot(self, token):
        jwt = JWTHelper(Config.rsapublickey, 'RS256')
        decodedToken = jwt.decode(token)
        if decodedToken != 'Token Expired':
            jwt = JWTHelper(Config.secretkey, 'HS256')
            now = round(time.time())
            payload = {
                'iat': now,
                'exp': now + Config.tokenlifetime,
                'client': 'bot'
            }
            resp = {
                'jwt': jwt.encode(payload)
            }
            return resp
        else:
            return False

    def getTokenForUser(self, username):
        userid = ''
        dt = self.db.select(['DiscordUserID'], 'discordusers', 'UserName = \'' + username '\'')
        print(dt.getRows()[0]['DiscordUserID'])
        if len(dt.getRows()) == 1:
            userid = dt.getRows()[0]['DiscordUserID']
        print(userid)
        if userid != '':
            jwt = JWTHelper(Config.secretkey, 'HS256')
            now = round(time.time())
            payload = {
                'iat': now,
                'exp': now + Config.tokenlifetime,
                'DiscordUserID': userid,
                'client': 'angular'
            }
            resp = {
                'jwt': jwt.encode(payload)
            }
            return resp
        else:
            return False
