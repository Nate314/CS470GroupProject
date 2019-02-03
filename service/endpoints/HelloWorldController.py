from flask import Flask, request
from flask_restful import Resource
from HelloWorldRepository import HelloWorldRepository
from StatusCodes import StatusCodes

# Controller classes are used to connect api endpoints with the Repository
class HelloWorldController(Resource):

    # initialize HelloWorldController
    def __init__(self):
        self._heloWorldRepository = HelloWorldRepository()

    # example get method
    def get(self):
        resp = self._heloWorldRepository.get_about()
        return resp, StatusCodes.OK
    
    # example post method
    def post(self):
        body = request.get_json()
        resp = {'you sent through a post': self._heloWorldRepository.post_test(body)}
        return resp, StatusCodes.CREATED

    # example put method
    def put(self):
        body = request.get_json()
        resp = {'you sent through a put': self._heloWorldRepository.put_test(body)}
        return resp, StatusCodes.OK

