from helpers import Database
from dtos import Alias, Category, Collectible, Command
from dtos import Description, DiscordUser, DiscordUserCollectible
from dtos import DiscordUserServer, DiscordUserSocialMedia
from dtos import Raffle, Resource, Server, ServerCategory, SocialMedia
import datetime

# Repositories retrieve data from the database
class DTORepository:

    # initialize DTORepository
    def __init__(self):
        self.db = Database()
    
    def __getDTO(self, table):
        dictionary = {
            'aliases': Alias({}),
            'categories': Category({}),
            'collectibles': Collectible({}),
            'commands': Command({}),
            'descriptions': Description({}),
            'discordusers': DiscordUser({}),
            'discordusercollectibles': DiscordUserCollectible({}),
            'discorduserservers': DiscordUserServer({}),
            'discordusersocialmedias': DiscordUserSocialMedia({}),
            'raffles': Raffle({}),
            'resources': Resource({}),
            'servers': Server({}),
            'servercategories': ServerCategory({}),
            'socialmedias': SocialMedia({})
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
        print(str(dt))
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
