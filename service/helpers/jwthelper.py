import time
import jwt

# used to encode and decode JSON Web Tokens
class JWTHelper(object):

    # initialize JWTHelper with a secret to use
    def __init__(self, secret, algorithm):
        self.secret = secret
        self.algorithm = algorithm
    
    # returns the encoded payload
    def encode(self, payload):
        encoded = jwt.encode(payload, self.secret, algorithm=self.algorithm)
        return str(encoded)[2:-1]
    
    # returns a dictionary representation of the payload from the token
    def decode(self, token):
        try:
            decoded = jwt.decode(token, self.secret, algorithms = [self.algorithm], verify=True)
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
# example of how to use this class with HS256
if __name__ == '__main__':
    now = round(time.time())
    payload = {
        'info': 'some info',
        'iat': now,
        'exp': now + 10
    }
    jwta = JWTHelper('secretkey', 'HS256')
    token = jwta.encode(payload)
    print(token)
    print(jwta.isExpired(token))
    print(jwta.decode(token))
'''

# example of how to use this class with RS256
if __name__ == '__main__':
    public = '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqrZrzCY1oTEQJW6vUJ3p9DgBm\n3OBnWGIeeNEqft6woiSymwNdHxfQsZrfLOfnwxdWkPIHkYTshHYQQzWXba8D578O\n41OPJhC+juISrlYtNBQKru/nAT1NfPceyBHKb2/Pt2firFR3IAmJFMBmIc13+pEl\nZlkxwsVZ/g6Zg/BWswIDAQAB\n-----END PUBLIC KEY-----\n'
    private = '-----BEGIN RSA PRIVATE KEY-----\nMIICXAIBAAKBgQCqrZrzCY1oTEQJW6vUJ3p9DgBm3OBnWGIeeNEqft6woiSymwNd\nHxfQsZrfLOfnwxdWkPIHkYTshHYQQzWXba8D578O41OPJhC+juISrlYtNBQKru/n\nAT1NfPceyBHKb2/Pt2firFR3IAmJFMBmIc13+pElZlkxwsVZ/g6Zg/BWswIDAQAB\nAoGATVeyOaQAglzdD+iMquzg4r5vjC1XOz2f6PMSxdEMFLrFKnJ4ScCHSDjTV4K/\n7BRKBR5VrvxQYeV8os3yARbhEYQZYVhf+2mN/3Zk/Og6uSiEnzXYn5ZcyHN9OXZ8\nmaSBDVDA8FFFnXZ69FOBD90/mECboMXMcZjzOBAbuEL/SyECQQDfiacMy9COgXYq\noOCDrnBpTovs8s5XmxbVmnK+ZuS4GoTn9Cgu1nBQ8A+F7Wcz0jCiKyPahYF8LoWA\nf010qZVpAkEAw3bR3hHtOxaXrQ5lIq0avZWn5/hlBz6tvzDW1JoEnktdCPItHlyB\nWgSA952S5lThYoln0fMa/3dboAZa2Hk7uwJAFiyMcpuBK7Gx7BabTtSt9/Q/sxh+\n2Xfb8wJoIXUJeS3AQ1YX6lWBPLYjhBCBrUVLZ7rJyrJ1nsDqo019fHYaCQJAL6wb\nI35bzb2E4MBSClMN4o9NlFYQzeOLnMXcn52w4qqe1j+6oV0Ob1YJ3lqgKW0qS04X\n9CzGuOfzgOQL5CAtYQJBAMZN6eBWkMehwMlywL0Xk+j8WmRcduJ0Z+GdPkhVu9LA\nMCNOIVqoAVIRU/Pi1GEuOIwYsi6HAsNNs8hk3VA5MwY=\n-----END RSA PRIVATE KEY-----\n'
    jwta = JWTHelper(private, 'RS256')
    now = round(time.time())
    payload = {
        'iat': now,
        'exp': now + 300
    }
    encoded = jwta.encode(payload)
    print(encoded)
    jwta = JWTHelper(public, 'RS256')
    decoded = jwta.decode(encoded)
    print(decoded)

# ---RESOURCES---
# https://pypi.org/project/PyJWT/1.0.1/
# ---RESOURCES---
