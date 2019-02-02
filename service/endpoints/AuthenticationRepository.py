from Database import Database
from jwthelper import JWTHelper
import time

# Repositories retrieve data from the database
class AuthenticationRepository:

    # initialize AuthenticationRepository
    def __init__(self):
        self.db = Database('localhost', 3306, 'root', 'root', 'DiscordBot')
    
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
            jwt = JWTHelper('secretkey', 'HS256')
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
        private = '-----BEGIN RSA PRIVATE KEY-----\nMIICXAIBAAKBgQCqrZrzCY1oTEQJW6vUJ3p9DgBm3OBnWGIeeNEqft6woiSymwNd\nHxfQsZrfLOfnwxdWkPIHkYTshHYQQzWXba8D578O41OPJhC+juISrlYtNBQKru/n\nAT1NfPceyBHKb2/Pt2firFR3IAmJFMBmIc13+pElZlkxwsVZ/g6Zg/BWswIDAQAB\nAoGATVeyOaQAglzdD+iMquzg4r5vjC1XOz2f6PMSxdEMFLrFKnJ4ScCHSDjTV4K/\n7BRKBR5VrvxQYeV8os3yARbhEYQZYVhf+2mN/3Zk/Og6uSiEnzXYn5ZcyHN9OXZ8\nmaSBDVDA8FFFnXZ69FOBD90/mECboMXMcZjzOBAbuEL/SyECQQDfiacMy9COgXYq\noOCDrnBpTovs8s5XmxbVmnK+ZuS4GoTn9Cgu1nBQ8A+F7Wcz0jCiKyPahYF8LoWA\nf010qZVpAkEAw3bR3hHtOxaXrQ5lIq0avZWn5/hlBz6tvzDW1JoEnktdCPItHlyB\nWgSA952S5lThYoln0fMa/3dboAZa2Hk7uwJAFiyMcpuBK7Gx7BabTtSt9/Q/sxh+\n2Xfb8wJoIXUJeS3AQ1YX6lWBPLYjhBCBrUVLZ7rJyrJ1nsDqo019fHYaCQJAL6wb\nI35bzb2E4MBSClMN4o9NlFYQzeOLnMXcn52w4qqe1j+6oV0Ob1YJ3lqgKW0qS04X\n9CzGuOfzgOQL5CAtYQJBAMZN6eBWkMehwMlywL0Xk+j8WmRcduJ0Z+GdPkhVu9LA\nMCNOIVqoAVIRU/Pi1GEuOIwYsi6HAsNNs8hk3VA5MwY=\n-----END RSA PRIVATE KEY-----\n'
        public = '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqrZrzCY1oTEQJW6vUJ3p9DgBm\n3OBnWGIeeNEqft6woiSymwNdHxfQsZrfLOfnwxdWkPIHkYTshHYQQzWXba8D578O\n41OPJhC+juISrlYtNBQKru/nAT1NfPceyBHKb2/Pt2firFR3IAmJFMBmIc13+pEl\nZlkxwsVZ/g6Zg/BWswIDAQAB\n-----END PUBLIC KEY-----\n'
        jwt = JWTHelper(public, 'RS256')
        decodedToken = jwt.decode(token)
        if decodedToken != 'Token Expired':
            jwt = JWTHelper('secretkey', 'HS256')
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
