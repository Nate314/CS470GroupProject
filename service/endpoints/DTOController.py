from flask import Flask, request
from flask_restful import Resource
from .DTORepository import DTORepository
from helpers import StatusCodes

# Controller classes are used to connect api endpoints with the Repository
class DTOController(Resource):

    # initialize HelloWorldController
    def __init__(self):
        self._dtoRepository = DTORepository()

    def post(self):
        body = request.get_json()
        success = self._dtoRepository.insert(body['table'], body['entity'])
        return success
