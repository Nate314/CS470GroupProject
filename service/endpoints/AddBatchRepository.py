from helpers import Database
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
            currentServers = dtoRepository.selectAll('servers')
            dbserverids = [s['ServerID'] for s in currentServers]
            for server in servers:
                print(server['ServerID'])
                if server['ServerID'] in dbserverids:
                    dtoRepository.update('servers', server, 'ServerID = %s', [server['ServerID']])
                else:
                    dtoRepository.insert('servers', server)
            return True
        except Exception as e:
            print(e)
            return False
    
    # add batch of users to the database
    def add_batch_users(self, users: list):
        try:
            # get list of serverids from the atabase
            dtoRepository = DTORepository()
            currentServers = dtoRepository.selectAll('servers')
            dbserverids = [s['ServerID'] for s in currentServers]
            currentDiscordUsers = dtoRepository.selectAll('discordusers')
            dbdiscorduserids = [d['DiscordUserID'] for d in currentDiscordUsers]
            for user in users:
                for server in user['Servers']:
                    if not server['ServerID'] in dbserverids:
                        # add each discorduserserver relationship to the DB
                        server['DiscordUserID'] = user['DiscordUserID']
                        self.db.insertOne('discorduserservers', ['DiscordUserID', 'ServerID', 'JoinDate'], eval(server))
                # add user if all of the ServerIDs for that user have allready been added to the DB
                del user['Servers']
                # if the user is new, insert
                if not user['DiscordUserID'] in dbdiscorduserids:
                    # insert profile picture
                    self.db.insertOne('resources', ['Link'], {'Link': user['ProfilePicture']})
                    id = self.db.select(['MAX(ResourceID) AS id'], 'resources').getRows()[0]['id']
                    del user['ProfilePicture']
                    user['ResourceID'] = id
                    # add the user to the list of users to add
                    user['DiscordUserID'] = user['DiscordUserID']
                    self.db.insertOne('discordusers',
                        ['DiscordUserID', 'UserName', 'UserHash', 'Currency', 'LastDaily', 'RaffleID'], user)
                    # insert into discordusersocialmedias
                    self.db.insertOne('discordusersocialmedias', ['DiscordUserID', 'SocialMediaID', 'Handle'],
                        {
                            'DiscordUserID': user['DiscordUserID'],
                            'SocialMediaID': '8',
                            'Handle': f"{user['UserName']}#{user['UserHash']}"
                        })
                # if the user already exists in the db, update
                else:
                    oldUser = self.db.select(['DiscordUserID', 'ResourceID'],
                        'discordusers', 'DiscordUserID = %s', [user['DiscordUserID']]).getRows()[0]
                    oldProfilePictureLink = self.db.select(['Link'], 'resources',
                        'ResourceID = \'' + str(oldUser['ResourceID']) + '\'').getRows()[0]['Link']
                    id = str(oldUser['ResourceID'])
                    # if the profilepicture is new, update resources table
                    if not oldProfilePictureLink == user['ProfilePicture']:
                        dtoRepository.update('resources', {'Link': user['ProfilePicture']},
                            'ResourceID = \'' + str(oldUser['ResourceID']) + '\'')
                    del user['ProfilePicture']
                    user['ResourceID'] = id
                    # update discorduser
                    dtoRepository.update('discordusers', user,
                        'DiscordUserID =  \'' + oldUser['DiscordUserID'] + '\'')
                    # insert or update discordusersocialmedias
                    if len(self.db.select(['*'], 'discordusersocialmedias', 'DiscordUserID = %s AND SocialMediaID = 8',
                        [user['DiscordUserID']]).getRows()) > 0:
                        self.db.update('discordusersocialmedias', ['DiscordUserID', 'SocialMediaID', 'Handle'],
                            {
                                'DiscordUserID': user['DiscordUserID'],
                                'SocialMediaID': '8',
                                'Handle': f"{user['UserName']}#{user['UserHash']}"
                            }, 'DiscordUserID =  %s', [user['DiscordUserID']])
                    else:
                        self.db.insertOne('discordusersocialmedias', ['DiscordUserID', 'SocialMediaID', 'Handle'],
                            {
                                'DiscordUserID': user['DiscordUserID'],
                                'SocialMediaID': '8',
                                'Handle': f"{user['UserName']}#{user['UserHash']}"
                            })
            return True
        except Exception as e:
            print(e)
            return False
