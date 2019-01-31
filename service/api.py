from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

import sys
import os
sys.path.append(os.path.abspath('./endpoints'))
sys.path.append(os.path.abspath('./helpers'))

from helpers.Middleware import Middleware
from endpoints.HelloWorldController import HelloWorldController, HelloWorldMultiController
from endpoints.AuthenticationController import AuthenticationLoginController

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
    api.add_resource(AuthenticationLoginController, '/auth/login')

if __name__ == '__main__':
    app, api = initializeAPI()
    addEndpoints(api)
    # starts the api in debug mode
    app.run(debug = True)

# ---RESOURCES---
#https://www.youtube.com/watch?v=s_ht4AKnWZg
#http://flask.pocoo.org/docs/1.0/api/#flask.Request.get_data
#https://stackoverflow.com/questions/15081542/python-creating-objects
#https://stackoverflow.com/questions/29386995/how-to-get-http-headers-in-flask
#https://medium.com/@devsudhi/how-to-create-a-middleware-in-flask-4e757041a6aa
# ---RESOURCES---
