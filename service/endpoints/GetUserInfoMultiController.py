from flask import Flask, request
from flask_restful import Resource
from .GetUserInfoRepository import GetUserInfoRepository
from helpers import StatusCodes

# This is another controller for a slightly different endpoint
class GetUserInfoMultiController(Resource):

    # initialize GetUserInfoMultiController
    def __init__(self):
        self._getUserInfoRepository = GetUserInfoRepository()
    
    # get info for a specific user
    def get(self, userid):
        resp = self._getUserInfoRepository.get_user(userid)
        return resp, StatusCodes.OK
