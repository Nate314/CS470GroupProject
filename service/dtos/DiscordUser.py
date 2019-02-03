from DTO import DTO

# DiscordUsers Table
class DiscordUser(DTO):
    def __init__(self, dictionary):
        props = ['DiscordUserID', 'UserName', 'Currency', 'LastDaily', 'RaffleID']
        super(DiscordUser, self).__init__(dictionary, props)
