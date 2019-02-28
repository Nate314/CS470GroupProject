from helpers import DTO

# DiscordUsers Table
class DiscordUser(DTO):
    def __init__(self, dictionary):
        props = ['DiscordUserID', 'UserName', 'UserHash', 'Currency', 'LastDaily', 'RaffleID']
        super(DiscordUser, self).__init__(dictionary, props)
