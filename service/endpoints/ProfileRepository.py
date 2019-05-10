'''
http://localhost:4200/app/profile?
Currency=795&
DiscordUserID=309176098590294026&
LastDaily=2019-04-18T23:52:00&
ProfilePictureURL=https:%2F%2Fcdn.discordapp.com%2Favatars%2F309176098590294026%2F531d8879a9929364290785323c02948e.png&
UserName=Nate314&
UserHash=3206&
Collectibles=ThumbsUp!!!!!https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/thumbs-up.png!!!!!!!!!!Blob!!!!!https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Noto_Emoji_KitKat_263a.svg/1200px-Noto_Emoji_KitKat_263a.svg.png!!!!!!!!!!Thinking!!!!!https://cdn.shopify.com/s/files/1/1061/1924/products/Thinking_Face_Emoji_large.png&
SocialMedias=Discord!!!!!https://cdn2.iconfinder.com/data/icons/gaming-platforms-logo-shapes/250/discord_logo-256.png!!!!!!!!!!Twitter!!!!!https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_6-twitter-256.png!!!!!!!!!!LinkedIn!!!!!https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_14-linkedin-256.png!!!!!!!!!!Reddit!!!!!https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_20-reddit-256.png
'''
from helpers import Database, StatusCodes

# Repositories retrieve data from the database
class ProfileRepository:

    # initialize ProfileRepository
    def __init__(self):
        self.db = Database()
    
    def trim(self, string):
        return string[:string.index('?')] if '?' in string else string
    
    def dtToMapStr(self, dt):
        result = ''
        counter = 0
        for row in dt:
            result += f"{row['k']}!!!!!{self.trim(row['v'])}"
            counter += 1
            result += '!!!!!!!!!!' if counter < len(dt) else ''
        return 'None' if result == '' else result

    def get_url(self, discorduserid):
        try:
            # SELECT discordusers.DiscordUserID, discordusers.UserName, discordusers.UserHash,
            # discordusers.Currency, discordusers.LastDaily, resources.Link AS ProfilePictureURL
            # FROM discordusers
            # JOIN resources ON discordusers.ResourceID = resources.ResourceID
            # WHERE discorduserid = '309176098590294026';
            dt = self.db.select(['discordusers.DiscordUserID', 'discordusers.UserName',
                'discordusers.UserHash', 'discordusers.Currency', 'discordusers.LastDaily',
                'resources.Link AS ProfilePictureURL'],
                'discordusers JOIN resources ON discordusers.ResourceID = resources.ResourceID',
                'DiscordUserID = %s', [discorduserid])
            if len(dt.getRows()) > 0:
                discorduser = eval(str(dt.getRows()[0]))
                # SELECT DISTINCT collectibles.Name, resources.Link
                # FROM discordusercollectibles
                # JOIN collectibles ON discordusercollectibles.CollectibleID = collectibles.CollectibleID
                # JOIN resources ON collectibles.ResourceID = resources.ResourceID
                # WHERE discorduserid = '309176098590294026';
                collectibles = []
                dt = self.db.select(['DISTINCT collectibles.Name AS k', 'resources.Link AS v'],
                    '''discordusercollectibles
                    JOIN collectibles ON discordusercollectibles.CollectibleID = collectibles.CollectibleID
                    JOIN resources ON collectibles.ResourceID = resources.ResourceID''', 'discorduserid = %s', [discorduserid])
                if len(dt.getRows()) > 0:
                    collectibles = eval(str(dt))
                # collectibles = []
                
                # SELECT DISTINCT socialmedias.Title, resources.Link
                # FROM discordusersocialmedias
                # JOIN socialmedias ON discordusersocialmedias.SocialMediaID = socialmedias.SocialMediaID
                # JOIN resources ON socialmedias.ResourceID = resources.ResourceID
                # WHERE discorduserid = '309176098590294026';
                socialmedias = []
                dt = self.db.select(['DISTINCT socialmedias.Title AS k', 'resources.Link AS v'],
                    '''discordusersocialmedias
                    JOIN socialmedias ON discordusersocialmedias.SocialMediaID = socialmedias.SocialMediaID
                    JOIN resources ON socialmedias.ResourceID = resources.ResourceID''',
                    'discorduserid = %s', [discorduserid])
                if len(dt.getRows()) > 0:
                    socialmedias = eval(str(dt))
                
                collectiblesmap = self.dtToMapStr(collectibles)
                socialmediasmap = self.dtToMapStr(socialmedias)
                url = ""
                url += f"app/profile?Currency={discorduser['Currency']}&DiscordUserID={discorduser['DiscordUserID']}&"
                url += f"LastDaily={discorduser['LastDaily']}&ProfilePictureURL={self.trim(discorduser['ProfilePictureURL'])}&"
                url += f"UserName={discorduser['UserName']}&UserHash={discorduser['UserHash']}&"
                url += f"Collectibles={collectiblesmap}&SocialMedias={socialmediasmap}"
                return url, StatusCodes.OK
            else:
                return 'user not found', StatusCodes.NOT_FOUND
        except Exception as e:
            return eval(str(e)), StatusCodes.INTERNAL_SERVER_ERROR
