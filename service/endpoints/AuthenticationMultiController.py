from flask import Flask, request, Response
from flask_restful import Resource
from .AuthenticationRepository import AuthenticationRepository
from helpers import StatusCodes

# Controller classes are used to connect api endpoints with the Repository
class AuthenticationMultiController(Resource):

    # initialize AuthenticationController
    def __init__(self):
        self._authenticationRepository = AuthenticationRepository()
    
    # auth/login/username for logging in a user via token via discord cli
    def get(self, username):
        resp = self._authenticationRepository.getTokenForUser(username)
        if resp == False:
            return Response('Could not find user', StatusCodes.UNAUTHORIZED)
        else:
            return resp, StatusCodes.OK
