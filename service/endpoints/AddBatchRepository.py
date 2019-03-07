from helpers import Database
from dtos import Server, DiscordUser
from .DTORepository import DTORepository

# Repositories retrieve data from the database
class AddBatchRepository:

    # initialize AddBatchRepository
    def __init__(self):
        self.db = Database()
    
    # add batch of servers to the database
    def add_batch_servers(self, servers: list):
        try:
            dtoRepository = DTORepository()
            for server in servers:
                server['ServerID'] = int(server['ServerID'])
                dtoRepository.insert('servers', server)
            return True
        except Exception as e:
            print(e)
            return False
    
    # add batch of users to the database
    def add_batch_users(self, users: list):
        # get list of serverids from the atabase
        discordusers = self.db.select(['DiscordUserID'], 'discordusers', '1')
        servers = self.db.select(['ServerID'], 'servers', '1')
        serverids = []
        for server in servers.getRows():
            serverids.append(server['ServerID'])
        discorduserids = []
        for discorduser in discordusers.getRows():
            discorduserids.append(discorduser['DiscordUserID'])
        usersToAdd = []
        usersNotAdded = []
        for user in users:
            add = True
            for server in user['Servers']:
                if not server['ServerID'] in serverids:
                    add = False
            add = add and (not user['DiscordUserID'] in discorduserids)
            # add user if all of the ServerIDs for that user have allready been added to the DB
            if add:
                # add each discorduserserver relationship to the DB
                for server in user['Servers']:
                    server['DiscordUserID'] = user['DiscordUserID']
                    print(server)
                    self.db.insertOne('discorduserservers', ['DiscordUserID', 'ServerID', 'JoinDate'], Server(server))
                del user['Servers']
                # insert the profile picture into the DB
                self.db.insertOne('resources', ['Link'], {'Link': user['ProfilePicture']})
                id = self.db.select(['MAX(ResourceID) AS id'], 'resources').getRows()[0]['id']
                del user['ProfilePicture']
                user['ResourceID'] = id
                # add the user to the list of users to add
                usersToAdd.append(user)
            else:
                usersNotAdded.append(user)
        userDTOs = [DiscordUser(user) for user in usersToAdd]
        # add users
        if len(usersToAdd) > 0:
            self.db.insert('discordusers', userDTOs[0].getProps(), userDTOs)
        if len(usersNotAdded) > 0:
            return usersNotAdded
        else:
            return True
