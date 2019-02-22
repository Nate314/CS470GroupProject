from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

import sys
import os
sys.path.append(os.path.abspath('./endpoints'))
sys.path.append(os.path.abspath('./helpers'))
sys.path.append(os.path.abspath('./dtos/db'))

from helpers.Middleware import Middleware
from endpoints.HelloWorldController import HelloWorldController
from endpoints.HelloWorldMultiController import HelloWorldMultiController
from endpoints.AuthenticationController import AuthenticationController
from endpoints.DTOController import DTOController
from endpoints.DTOMultiController import DTOMultiController
from Config import Config

# reads in config files so that the Config class can be used later
def configConfig(configFilename, cryptFilename):
    configJSON = None
    cryptJSON = None
    with open(configFilename) as reader:
        configJSON = eval(reader.read())
    with open(cryptFilename) as reader:
        cryptJSON = eval(reader.read())
    print(configJSON)
    print(cryptJSON)
    if configJSON != None and cryptJSON != None:
        Config(configJSON, cryptJSON)
        return True
    else:
        return False

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
    api.add_resource(HelloWorldController, '/helloworld')
    api.add_resource(HelloWorldMultiController, '/helloworld/<int:num>')
    api.add_resource(AuthenticationController, '/auth/login')
    api.add_resource(DTOController, '/api/dto')
    api.add_resource(DTOMultiController, '/api/dto/<string:table>')

if __name__ == '__main__':
    if configConfig('config.json', 'crypt.json'):
        app, api = initializeAPI()
        addEndpoints(api)
        # starts the api in debug mode
        app.run(debug = True)
    else:
        print('unsuccessful in reading configuration files')

# ---RESOURCES---
#https://www.youtube.com/watch?v=s_ht4AKnWZg
#http://flask.pocoo.org/docs/1.0/api/#flask.Request.get_data
#https://stackoverflow.com/questions/15081542/python-creating-objects
#https://stackoverflow.com/questions/29386995/how-to-get-http-headers-in-flask
#https://medium.com/@devsudhi/how-to-create-a-middleware-in-flask-4e757041a6aa
# ---RESOURCES---
