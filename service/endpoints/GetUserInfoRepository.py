from helpers import Database

# Repositories retrieve data from the database
class GetUserInfoRepository:

    # initialize GetUserInfoRepository
    def __init__(self):
        self.db = Database()
    
    # retrieve user from DB
    def get_user(self, userid):
        dt = self.db.select(['DiscordUserID', 'UserName', 'UserHash', 'Currency',
            'LastDaily', 'RaffleID', 'Link AS ProfilePictureURL'],
            'discordusers LEFT OUTER JOIN resources ON resources.ResourceID = discordusers.ResourceID',
            'discorduserid = ' + str(userid))
        return eval(str(dt.getRows()[0]))
