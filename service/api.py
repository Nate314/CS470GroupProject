import os
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

from helpers import Middleware, Config
from endpoints import AuthenticationController, AuthenticationMultiController
from endpoints import DTOController, DTOMultiController
from endpoints import AddBatchMultiController, GetUserInfoMultiController
from endpoints import CurrencyController, CollectiblesMultiController
from endpoints import RaffleController, RaffleMultiController
from endpoints import SocialMediaController, SocialMediaMultiController
from endpoints import ProfileMultiController

# initializing api
def initializeAPI():
    app = Flask(__name__)
    CORS(app)
    api = Api(app)
    # adding middleware
    app.wsgi_app = Middleware(app.wsgi_app)
    return app, api

def addEndpoints(api):
    # this is where all of the controllers and endpoints are matched up
    api.add_resource(AuthenticationController, '/auth/login')
    api.add_resource(AuthenticationMultiController, '/auth/login/<string:username>')
    api.add_resource(DTOController, '/api/dto')
    api.add_resource(DTOMultiController, '/api/dto/<string:table>')
    api.add_resource(AddBatchMultiController, '/api/addbatch/<string:entity>')
    api.add_resource(GetUserInfoMultiController, '/api/getuserinfo/<string:userid>')
    api.add_resource(CurrencyController, '/api/currency/transfer')
    api.add_resource(RaffleController, '/api/raffles')
    api.add_resource(RaffleMultiController, '/api/raffles/<string:extension>')
    api.add_resource(CollectiblesMultiController, '/api/collectibles/<string:extension>')
    api.add_resource(SocialMediaController, '/api/social')
    api.add_resource(SocialMediaMultiController, '/api/social/<string:extension>')
    api.add_resource(ProfileMultiController, '/api/profile/<string:discorduserid>')

if __name__ == '__main__':
    # reads the settings from environment variables so that the Config class can be used later
    Config()
    app, api = initializeAPI()
    addEndpoints(api)
    # debug mode (with its interactive debugger) only when FLASK_DEBUG=1
    app.run(debug = os.environ.get('FLASK_DEBUG') == '1', host = Config.hostip)

# ---RESOURCES---
#https://www.youtube.com/watch?v=s_ht4AKnWZg
#http://flask.pocoo.org/docs/1.0/api/#flask.Request.get_data
#https://stackoverflow.com/questions/15081542/python-creating-objects
#https://stackoverflow.com/questions/29386995/how-to-get-http-headers-in-flask
#https://medium.com/@devsudhi/how-to-create-a-middleware-in-flask-4e757041a6aa
# ---RESOURCES---
