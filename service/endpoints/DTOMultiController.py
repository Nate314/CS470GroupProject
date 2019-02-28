from flask import Flask, request
from flask_restful import Resource
from .DTORepository import DTORepository
from helpers import StatusCodes

# This is another controller for a slightly different endpoint
class DTOMultiController(Resource):

    # initialize HelloWorldMultiController
    def __init__(self):
        self._dtoRepository = DTORepository()
    
    # used to select all from table
    def get(self, table):
        resp = self._dtoRepository.selectAll(table)
        return resp, StatusCodes.OK

    # used to delete
    def post(self, table):
        body = request.get_json()
        resp = self._dtoRepository.delete(table, body['where'])
        return resp, StatusCodes.OK
