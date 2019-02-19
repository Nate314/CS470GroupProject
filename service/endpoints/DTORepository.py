from Database import Database
from Collectible import Collectible
from Command import Command
from DiscordUser import DiscordUser
from DiscordUserCollectible import DiscordUserCollectible
from DiscordUserServer import DiscordUserServer
from DiscordUserSocialMedia import DiscordUserSocialMedia
from Embed import Embed
from Raffle import Raffle
from Server import Server
from SocialMedia import SocialMedia

# Repositories retrieve data from the database
class DTORepository:

    # initialize DTORepository
    def __init__(self):
        self.db = Database('localhost', 3306, 'root', 'root', 'DiscordBot')
    
    def __getDTO(self, table):
        dictionary = {
            'Collectibles': Collectible({}),
            'Commands': Command({}),
            'DiscordUsers': DiscordUser({}),
            'DiscordUserCollectibles': DiscordUserCollectible({}),
            'DiscordUserServers': DiscordUserServer({}),
            'DiscordUserSocialMedias': DiscordUserSocialMedia({}),
            'Embeds': Embed({}),
            'Raffles': Raffle({}),
            'Servers': Server({}),
            'SocialMedias': SocialMedia({})
        }
        return dictionary[table]
    
    def __getKeys(self, entity):
        props = []
        for key in entity.keys():
            props.append(key)
        return props

    # returns the table passed
    def selectAll(self, table):
        dto = self.__getDTO(table)
        dt = self.db.select(['*'], table)
        return eval(str(dt))
    
    # retrieve information for the get id method on the controller
    def insert(self, table, entity):
        props = self.__getKeys(entity)
        return self.db.insertOne(table, props, entity)
    
    def update(self, table, entity, where):
        props = self.__getKeys(entity)
        return self.db.update(table, props, entity, where)
    
    def delete(self, table, where):
        dt = self.db.delete(table, where)
        return eval(str(dt))