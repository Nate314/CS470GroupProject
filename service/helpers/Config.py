import os

class Config:

    # db variables
    host = None
    port = None
    user = None
    password = None
    db = None
    # used to start up the server
    hostip = None
    tokenlifetime = None
    # keys
    rsapublickey = None
    secretkey = None

    # reads the settings from environment variables (see .env.example in the repo root)
    def __init__(self, env = os.environ):
        # setting db variables
        Config.host = env.get('DB_HOST', 'localhost')
        Config.port = int(env.get('DB_PORT', '3306'))
        Config.user = env['DB_USER']
        Config.password = env['DB_PASSWORD']
        Config.db = env.get('DB_NAME', 'DiscordBot')
        # setting server variables
        Config.hostip = env.get('HOST_IP', '0.0.0.0')
        Config.tokenlifetime = int(env.get('TOKEN_LIFETIME', '3600'))
        # setting keys
        Config.rsapublickey = env.get('RSA_PUBLIC_KEY', '')
        Config.secretkey = env['JWT_SECRET']
