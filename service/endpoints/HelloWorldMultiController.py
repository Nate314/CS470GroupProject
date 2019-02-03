from flask import Flask, request
from flask_restful import Resource
from HelloWorldRepository import HelloWorldRepository
from StatusCodes import StatusCodes

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
