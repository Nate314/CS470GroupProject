from flask import Flask, request
from flask_restful import Resource
from .RaffleRepository import RaffleRepository
from helpers import StatusCodes

# This is another controller for a slightly different endpoint
class RaffleMultiController(Resource):

    # initialize RaffleMultiController
    def __init__(self):
        self._raffleRepository = RaffleRepository()
    
    # gets a list of all raffles matching the extension
    def get(self, extension):
        if len(str(extension)) >= 18:
            ServerID = extension
            # returns all raffles matching the {ServerID} passed
            resp, statusCode = self._raffleRepository.get_raffles(ServerID)
        else:
            millis = int(extension)
            # returns all raffles ending in before {millis} number of seconds from now
            resp, statusCode = self._raffleRepository.get_raffles_ending_in_millis(millis)
        return resp, statusCode
