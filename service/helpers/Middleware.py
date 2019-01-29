from flask import Response, request
from werkzeug.exceptions import abort, HTTPException
from jwthelper import JWTHelper
from StatusCodes import StatusCodes
import time

# Middlewares are used for code that needs to run
#  for every call to an API, like authentication and such
class Middleware(object):

    # initialize Middleware 
    def __init__(self, app):
        self.app = app

    # this code runs on every api call
    def __call__(self, environ, start_response):
        if not ('OPTIONS' in str(environ['werkzeug.request'])):
            token = str(environ['HTTP_AUTHORIZATION'])
            if len(token.split(' ')) > 1:
                token = token.split(' ')[1]
            jwt = JWTHelper('secretkey')
            print('----------------')
            print(jwt.isExpired(token))
            print(jwt.decode(token))
            print('----------------')
            if jwt.isExpired(token):
                try:
                    now = round(time.time())
                    payload = {
                        'iat': now,
                        'exp': now + 60
                    }
                    print(jwt.encode(payload))
                    abort(Response('Forbidden', StatusCodes.FORBIDDEN))
                except HTTPException as e:
                    return e(environ, start_response)
        return self.app(environ, start_response)

# ---RESOURCES---
# https://pypi.org/project/jwt/
# ---RESOURCES---
