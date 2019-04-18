from flask import Flask, request
from flask_restful import Resource
from .AddBatchRepository import AddBatchRepository
from helpers import StatusCodes

# This is another controller for a slightly different endpoint
class AddBatchMultiController(Resource):

    # initialize AddBatchMultiController
    def __init__(self):
        self._addBatchRepository = AddBatchRepository()
    
    # example get method passing an number
    def post(self, entity):
        success = True
        body = request.get_json()
        if entity == 'servers':
            success = self._addBatchRepository.add_batch_servers(body)
        elif entity == 'users':
            success = self._addBatchRepository.add_batch_users(body)
        if success == True:
            return True, StatusCodes.OK
        elif success == False:
            return 'failed to insert into ' + entity, StatusCodes.INTERNAL_SERVER_ERROR
        else:
            return success, StatusCodes.INTERNAL_SERVER_ERROR
