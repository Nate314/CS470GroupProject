from flask import Flask, request
from flask_restful import Resource
from .ProfileRepository import ProfileRepository
from helpers import StatusCodes

# This is another controller for a slightly different endpoint
class ProfileMultiController(Resource):

    # initialize ProfileMultiController
    def __init__(self):
        self._profileRepository = ProfileRepository()
    
    # example get method passing an number
    def get(self, discorduserid):
        resp, statuscode = self._profileRepository.get_url(discorduserid)
        return resp, statuscode
