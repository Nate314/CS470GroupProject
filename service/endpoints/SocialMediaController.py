from flask import Flask, request
from flask_restful import Resource
from .SocialMediaRepository import SocialMediaRepository

# Controller classes are used to connect api endpoints with the Repository
class SocialMediaController(Resource):

    # initialize SocialMediaController
    def __init__(self):
        self._socialMediaRepository = SocialMediaRepository()
    
    # Lists the different social media platforms that this bot supports
    def get(self):
        return self._socialMediaRepository.list_all()
    
    # Adds the specified <socialmedia> platform and <handle> to the sending user's profile
    def post(self):
        body = request.get_json()
        return self._socialMediaRepository.add_social_media(body['DiscordUserID'], body['Platform'], body['Link'])
