from flask import Flask, request
from flask_restful import Resource
from .SocialMediaRepository import SocialMediaRepository
from helpers import StatusCodes

# This is another controller for a slightly different endpoint
class SocialMediaMultiController(Resource):

    # initialize SocialMediaMultiController
    def __init__(self):
        self._socialMediaRepository = SocialMediaRepository()
    
    # returns information about the social media(s) for the specified user
    def get(self, extension):
        if '.' in extension:
            DiscordUserID = extension[:extension.index('.')]
            SocialMediaName = extension[extension.index('.') + 1:]
            # returns information about the specific social media for the specified user
            resp, statusCode = self._socialMediaRepository.get_social_media(DiscordUserID, SocialMediaName)
        else:
            DiscordUserID = extension
            # returns information about the all social medias for the specified user
            resp, statusCode = self._socialMediaRepository.get_social_medias(DiscordUserID)
        return resp, statusCode
    
    # returns information about the social media(s) for the specified user
    def delete(self, extension):
        DiscordUserID = extension[:extension.index('.')]
        SocialMediaName = extension[extension.index('.') + 1:]
        # returns information about the specific social media for the specified user
        resp, statusCode = self._socialMediaRepository.delete_social_media(DiscordUserID, SocialMediaName)
        return resp, statusCode
