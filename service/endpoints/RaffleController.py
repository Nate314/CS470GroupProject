from flask import Flask, request
from flask_restful import Resource
from .RaffleRepository import RaffleRepository
from helpers import StatusCodes

# Controller classes are used to connect api endpoints with the Repository
class RaffleController(Resource):

    # initialize RaffleController
    def __init__(self):
        self._raffleRepository = RaffleRepository()
    
    # POST api/raffles to start a new raffle
    def post(self):
        body = request.get_json()
        resp, statusCode = self._raffleRepository.start_raffle(body['Name'],
            body['DiscordUserID'], body['ServerID'], body['Duration'], body['SeedAmount'])
        return resp, statusCode

    # PUT api/raffles to join an existing raffle
    def put(self):
        body = request.get_json()
        resp, statusCode = self._raffleRepository.join_raffle(
            body['DiscordUserID'], body['ServerID'], body['Raffle'], body['Amount'])
        return resp, statusCode

    #DELETE api/raffles to end a raffle
    def delete(self):
        body = request.get_json()
        resp, statusCodes = self._raffleRepository.end_raffle(
            body['DiscordUserID'], body['ServerID'], body['Raffle'])
        return resp, statusCodes
