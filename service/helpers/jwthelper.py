import time
import jwt

# used to encode and decode JSON Web Tokens
class JWTHelper(object):

    # initialize JWTHelper with a secret to use
    def __init__(self, secret):
        self.secret = secret
    
    # returns the encoded payload
    def encode(self, payload):
        encoded = jwt.encode(payload, self.secret, algorithm='HS256')
        return str(encoded)[2:-1]
    
    # returns a dictionary representation of the payload from the token
    def decode(self, token):
        try:
            decoded = jwt.decode(token, self.secret, algorithms=['HS256'], verify=True)
            return decoded
        except:
            return 'Token Expired'

    # returns true if the token is expired
    def isExpired(self, token):
        try:
            now = round(time.time())
            token = self.decode(token)
            exp = token['exp']
            return now > exp
        except:
            return True

'''
# example of how to use this class
if __name__ == '__main__':
    now = round(time.time())
    payload = {
        'info': 'some info',
        'iat': now,
        'exp': now + 10
    }
    jwt = JWTHelper('secretkey')
    token = jwt.encode(payload)
    print(token)
    print(jwt.isExpired(token))
    print(jwt.decode(token))
'''

# ---RESOURCES---
# https://pypi.org/project/PyJWT/1.0.1/
# ---RESOURCES---
