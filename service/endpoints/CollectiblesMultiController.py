from flask import Flask, request
from flask_restful import Resource
from .CollectiblesRepository import CollectiblesRepository
from .DTORepository import DTORepository
from helpers import StatusCodes

# Controller classes are used to connect api endpoints with the Repository
class CollectiblesMultiController(Resource):

    # initialize CollectiblesMultiController
    def __init__(self):
        self._collectiblesRepository = CollectiblesRepository()
        self._dtoRepository = DTORepository()
    
    # api/collectibles/list, api/collectibles/user.ID
    def get(self, extension):
        print(extension)
        if extension == 'list':
            dt = self._dtoRepository.selectAll('collectibles')
            print(dt)
            return dt, StatusCodes.OK
        elif 'user.' in extension:
            DiscordUserID = extension[len('user.'):]
            return self._collectiblesRepository.get_collectibles_for_user(DiscordUserID)
    
    # api/collectibles/purchase
    def post(self, extension):
        success = True
        body = request.get_json()
        if extension == 'purchase':
            return self._collectiblesRepository.purchase(body['DiscordUserID'], body['CollectibleName'])
        else:
            return 'endpoint not found', StatusCodes.NOT_FOUND
