import datetime
import random
from helpers import Database
from helpers import StatusCodes
from .CommonRepository import CommonRepository

# Repositories retrieve data from the database
class SocialMediaRepository:

    # initialize SocialMediaRepository
    def __init__(self):
        self.db = Database()
        self._commonRepository = CommonRepository()
    
    # Lists the different social media platforms that this bot supports
    def list_all(self):
        try:
            # SELECT Title AS Platform, URL AS Link, Link AS Icon
            #   FROM socialmedias
            #   JOIN resources ON socialmedias.ResourceID = resources.ResourceID;
            socialmedias = self.db.select(['Title AS Platform', 'URL AS Link', 'Link AS Icon'], \
                'socialmedias JOIN resources ON socialmedias.ResourceID = resources.ResourceID')
            return eval(str(socialmedias)), StatusCodes.OK
        except:
            # some error has occurred
            return '', StatusCodes.INTERNAL_SERVER_ERROR
    
    # Adds the specified <socialmedia> platform and <handle> to the sending user's profile
    def add_social_media(self, rDiscordUserID, rPlatform, rLink):
        try:
            # SELECT * FROM socialmedias WHERE Title = 'Facebook';
            socialMedia = self.db.select(['SocialMediaID'], 'socialmedias', 'Title = %s', [rPlatform]).getRows()
            if len(socialMedia) > 0:
                smID = socialMedia[0]['SocialMediaID']
                # INSERT INTO discordusersocialmedias (DiscordUserID, SocialMediaID, Handle)
                #   VALUES ('309176098590294026', '1', 'Nathan Gawith');
                if len(self.db.select(['*'], 'discordusersocialmedias', 'DiscordUserID = %s AND SocialMediaID = %s', [rDiscordUserID, smID]).getRows()) > 0:
                    self.db.update('discordusersocialmedias', ['Handle'], { 'Handle': rLink }, 'DiscordUserID = %s AND SocialMediaID = %s', [rDiscordUserID, smID])
                else:
                    self.db.insertOne('discordusersocialmedias', ['DiscordUserID', 'SocialMediaID', 'Handle'],
                        {
                            'DiscordUserID': rDiscordUserID,
                            'SocialMediaID': smID,
                            'Handle': rLink
                        })
                return '', StatusCodes.OK
            else:
                return f"'{rPlatform}' was not found in the socialmedias table", StatusCodes.NOT_FOUND
        except:
            # some error has occurred
            return '', StatusCodes.INTERNAL_SERVER_ERROR
    
    # returns information about the specific social media for the specified user
    def get_social_media(self, rDiscordUserID, rSocialMediaName):
        try:
            # SELECT * FROM socialmedias WHERE Title = 'Facebook';
            socialMedia = self.db.select(['SocialMediaID'], 'socialmedias', 'Title LIKE %s', [rSocialMediaName]).getRows()
            if len(socialMedia) > 0:
                # SELECT Title AS Platform, Handle AS Link, Link AS ICON
                #   FROM discordusersocialmedias
                #   INNER JOIN socialmedias ON discordusersocialmedias.SocialMediaID = socialmedias.SocialMediaID
                #   INNER JOIN resources ON socialmedias.ResourceID = resources.ResourceID
                #   WHERE DiscordUserID = '123456789123456789' AND Title LIKE 'Facebook';
                qeryResult = self.db.select(['Title AS Platform', 'Handle AS Link', 'Link AS ICON'], \
                    '''discordusersocialmedias
                    INNER JOIN socialmedias ON discordusersocialmedias.SocialMediaID = socialmedias.SocialMediaID
                    INNER JOIN resources ON socialmedias.ResourceID = resources.ResourceID''',
                    'DiscordUserID = %s AND Title LIKE %s', [rDiscordUserID, rSocialMediaName])
                return eval(str(qeryResult)), StatusCodes.OK
            else:
                return f"'{rSocialMediaName}' was not found in the socialmedias table", StatusCodes.NOT_FOUND
        except:
            # some error has occurred
            return '', StatusCodes.INTERNAL_SERVER_ERROR
    
    # Adds the specified <socialmedia> platform and <handle> to the sending user's profile
    def get_social_medias(self, rDiscordUserID):
        try:
            return self.get_social_media(rDiscordUserID, '%')
        except:
            # some error has occurred
            return '', StatusCodes.INTERNAL_SERVER_ERROR

    # deletes from discordusersocialmedias for the specific social media and discorduser
    def delete_social_media(self, rDiscordUserID, rSocialMediaName):
        try:
            # SELECT * FROM socialmedias WHERE Title = 'Facebook';
            socialMedia = self.db.select(['SocialMediaID'], 'socialmedias', 'Title LIKE %s', [rSocialMediaName]).getRows()
            if len(socialMedia) > 0:
                # SELECT Title AS Platform, Handle AS Link, Link AS ICON
                #   FROM discordusersocialmedias
                #   INNER JOIN socialmedias ON discordusersocialmedias.SocialMediaID = socialmedias.SocialMediaID
                #   INNER JOIN resources ON socialmedias.ResourceID = resources.ResourceID
                #   WHERE DiscordUserID = '123456789123456789' AND Title LIKE 'Facebook';
                if len(self.db.select(['Title AS Platform', 'Handle AS Link', 'Link AS ICON'], \
                    '''discordusersocialmedias
                    INNER JOIN socialmedias ON discordusersocialmedias.SocialMediaID = socialmedias.SocialMediaID
                    INNER JOIN resources ON socialmedias.ResourceID = resources.ResourceID''',
                    'DiscordUserID = %s AND Title LIKE %s', [rDiscordUserID, rSocialMediaName]).getRows()) > 0:
                    self.db.delete('discordusersocialmedias', 'DiscordUserID = %s AND SocialMediaID = %s', [rDiscordUserID, str(socialMedia[0]['SocialMediaID'])])
                    return 'Success', StatusCodes.OK
                else:
                    return 'This user does not have this specific social media', StatusCodes.NOT_FOUND
            else:
                return f"'{rSocialMediaName}' was not found in the socialmedias table", StatusCodes.NOT_FOUND
        except:
            # some error has occurred
            return '', StatusCodes.INTERNAL_SERVER_ERROR