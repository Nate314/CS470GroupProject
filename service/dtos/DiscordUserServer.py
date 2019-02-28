from helpers import DTO

# DiscordUserServers Table
class DiscordUserServer(DTO):
    def __init__(self, dictionary):
        props = ['DiscordUserID', 'ServerID', 'JoinDate']
        super(DiscordUserServer, self).__init__(dictionary, props)
