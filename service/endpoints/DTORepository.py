from helpers import Database
from dtos import Alias, Category, Collectible, Command
from dtos import Description, DiscordUser, DiscordUserCollectible
from dtos import DiscordUserServer, DiscordUserSocialMedia
from dtos import Raffle, Resource, Server, ServerCategory, SocialMedia

# Repositories retrieve data from the database
class DTORepository:

    # initialize DTORepository
    def __init__(self):
        self.db = Database()
    
    def __getDTO(self, table):
        dictionary = {
            'Aliases': Alias({}),
            'Categories': Category({}),
            'Collectibles': Collectible({}),
            'Commands': Command({}),
            'Descriptions': Description({}),
            'DiscordUsers': DiscordUser({}),
            'DiscordUserCollectibles': DiscordUserCollectible({}),
            'DiscordUserServers': DiscordUserServer({}),
            'DiscordUserSocialMedias': DiscordUserSocialMedia({}),
            'Raffles': Raffle({}),
            'Resources': Resource({}),
            'Servers': Server({}),
            'ServerCategories': ServerCategory({}),
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
