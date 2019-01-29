from flask import Flask, request
from flask_restful import Resource, Api
from .HelloWorldRepository import HelloWorldRepository
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

# This is another controller for a slightly different endpoint
class HelloWorldMultiController(Resource):

    # initialize HelloWorldMultiController
    def __init__(self):
        self._heloWorldRepository = HelloWorldRepository()
    
    # example get method passing an number
    def get(self, num):
        resp = {'result': self._heloWorldRepository.get_id(num)}
        return resp, StatusCodes.OK
    
    # example delete method
    def delete(self, num):
        body = num
        resp = {'you sent through a delete': self._heloWorldRepository.delete_test(body)}
        return resp, StatusCodes.OK
