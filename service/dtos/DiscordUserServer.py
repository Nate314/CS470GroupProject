from DTO import DTO

# DiscordUserServers Table
class DiscordUserServer(DTO):
    def __init__(self, dictionary):
        props = ['DiscordUserID', 'ServerID', 'Date']
        super(DiscordUserServer, self).__init__(dictionary, props)
