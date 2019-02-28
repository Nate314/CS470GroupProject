from flask import Flask, request, Response
from flask_restful import Resource
from endpoints import AuthenticationRepository
from helpers import StatusCodes

# Controller classes are used to connect api endpoints with the Repository
class AuthenticationController(Resource):

    # initialize AuthenticationController
    def __init__(self):
        self._authenticationRepository = AuthenticationRepository()
    
    # auth/login
    def post(self):
        body = request.get_json()
        print('body')
        print(body)
        print('body')
        resp = self._authenticationRepository.loginClient(body['token'], body['username'], body['password'])
        if resp == False:
            return Response('Invalid Credentials', StatusCodes.UNAUTHORIZED)
        else:
            return resp, StatusCodes.OK

    def put(self):
        body = request.get_json()
        print(body)
        resp = self._authenticationRepository.loginBot(body)
        if resp == False:
            return Response('Invalid Credentials', StatusCodes.UNAUTHORIZED)
        else:
            print(resp)
            return resp, StatusCodes.OK
