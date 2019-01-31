from flask import Flask, request, Response
from flask_restful import Resource
from .AuthenticationRepository import AuthenticationRepository
from StatusCodes import StatusCodes

# Controller classes are used to connect api endpoints with the Repository
class AuthenticationLoginController(Resource):

    # initialize HelloWorldController
    def __init__(self):
        self._authenticationRepository = AuthenticationRepository()
    
    # auth/login
    def post(self):
        body = request.get_json()
        resp = self._authenticationRepository.login(body['username'], body['password'])
        if resp == False:
            return Response('Invalid Credentials', StatusCodes.UNAUTHORIZED)
        else:
            return resp, StatusCodes.OK
 