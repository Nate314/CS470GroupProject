from flask import Response, request
from werkzeug.exceptions import abort, HTTPException
from .jwthelper import JWTHelper
from .StatusCodes import StatusCodes
from .Config import Config
import time

# Middlewares are used for code that needs to run
#  for every call to an API, like authentication and such
class Middleware(object):

    # initialize Middleware 
    def __init__(self, app):
        self.app = app

    # this code runs on every api call
    def __call__(self, environ, start_response):
        shouldCheckForValidJWT = (not environ['PATH_INFO'].startswith('/auth'))
        shouldCheckForValidJWT = shouldCheckForValidJWT or environ['PATH_INFO'].startswith('/auth/login/')
        if shouldCheckForValidJWT:
            if not ('OPTIONS' in str(environ['werkzeug.request'])):
                token = str(environ['HTTP_AUTHORIZATION'])
                if len(token.split(' ')) > 1:
                    token = token.split(' ')[1]
                jwt = JWTHelper(Config.secretkey, 'HS256')
                if jwt.isExpired(token):
                    try:
                        abort(Response('Forbidden', StatusCodes.FORBIDDEN))
                    except HTTPException as e:
                        return e(environ, start_response)
        return self.app(environ, start_response)

# ---RESOURCES---
# https://pypi.org/project/jwt/
# ---RESOURCES---
