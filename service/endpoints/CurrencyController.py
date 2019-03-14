from flask import Flask, request, Response
from flask_restful import Resource
from .CurrencyRepository import CurrencyRepository
from helpers import StatusCodes

# Controller classes are used to connect api endpoints with the Repository
class CurrencyController(Resource):

    # initialize CurrencyController
    def __init__(self):
        self._currencyRepository = CurrencyRepository()
    
    # api/currency/transfer
    def post(self):
        body = request.get_json()
        sender = body['Sender']
        receiver = body['Receiver']
        amount = body['amount']
        resp = False
        # if 
        if sender == "0":
            resp = self._currencyRepository.daily(receiver, amount)
            print('resp')
            print(resp)
            print('resp')
        else:
            resp = self._currencyRepository.transfer(sender, receiver, amount)
        if resp == False:
            return Response('Could not complete transaction', StatusCodes.INTERNAL_SERVER_ERROR)
        elif type(resp) == int:
            return resp, StatusCodes.IM_A_TEAPOT
        elif type(resp) == str:
            return resp, StatusCodes.RANGE_NOT_SATISFIABLE
        else:
            return resp, StatusCodes.OK
