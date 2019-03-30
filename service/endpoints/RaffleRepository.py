import datetime
import random
from helpers import Database
from helpers import StatusCodes

# Repositories retrieve data from the database
class RaffleRepository:

    # initialize RaffleRepository
    def __init__(self):
        self.db = Database()
    
    # returns JSON representing all of the users participating in this raffle
    def __get_discordusers_in_raffle(self, raffleID):
        return eval(str(self.db.select([
            'discordusers.DiscordUserID', 'discordusers.UserName', 'discordusers.Currency',
            'discordusers.UserHash', 'resources.Link AS ProfilePicture'],
            '''discorduserraffles
            LEFT OUTER JOIN discordusers ON discordusers.DiscordUserID = discorduserraffles.DiscordUserID
            LEFT OUTER JOIN resources ON resources.ResourceID = discordusers.ResourceID''',
            f"discorduserraffles.RaffleID = '{raffleID}'")))
    
    def __add_currency_to_table(self, table, idcolumn, id, amount):
        self.db.update(table, ['Currency'], {
            'Currency': int(self.db.select(['Currency'], table,
                f"{idcolumn} = '{id}'").getRows()[0]['Currency']) + int(amount)
        }, f"{idcolumn} = '{id}'")
    
    # adds amount to specified users's currency
    def __add_currency_to_raffle(self, raffleid, amount):
        self.__add_currency_to_table('raffles', 'RaffleID', raffleid, amount)
    
    # adds amount to specified users's currency
    def __add_to_user_currency(self, discorduserid, amount):
        self.__add_currency_to_table('discordusers', 'DiscordUserID', discorduserid, amount)
    
    # subtracts amount from specified users's currency
    def __subtract_from_user_currency(self, discorduserid, amount):
        self.__add_to_user_currency(discorduserid, -1 * amount)
    
    # starts a new raffle
    def start_raffle(self, rName, rDiscordUserID, rServerID, rDuration, rSeedAmount):
        try:
            userCurrenyQuery = self.db.select(['Currency'], 'discordusers',
                f"DiscordUserID = '{rDiscordUserID}'").getRows()
            if len(userCurrenyQuery) > 0:
                userCurrency = userCurrenyQuery[0]['Currency']
                # make sure the user has enough currency to start this raffle
                if userCurrency >= rSeedAmount:
                    endTime = None
                    # calculate end datetime of this raffle
                    if rDuration >= 0:
                        nowtime = datetime.datetime.now().timestamp()
                        endTime = str(datetime.datetime.fromtimestamp(int(nowtime + (rDuration / 1000))))
                    # create raffle in Raffles table
                    if self.db.insertOne('raffles', ['ServerID', 'Name', 'EndTime', 'Currency', 'DiscordUserID'], {
                        'ServerID': rServerID,
                        'Name': rName,
                        'EndTime': endTime,
                        'Currency': rSeedAmount,
                        'DiscordUserID': rDiscordUserID
                    }):
                        # get the new RaffleID
                        maxID = self.db.select(['MAX(RaffleID) AS NewID'], 'raffles').getRows()
                        newRaffleID = 1
                        if (len(maxID) > 0):
                            newRaffleID = maxID[0]['NewID']
                        # insert into DiscordUserRaffles table
                        self.db.insertOne('discorduserraffles', ['DiscordUserID', 'RaffleID', 'JoinDate'], {
                            'DiscordUserID': rDiscordUserID,
                            'RaffleID': newRaffleID,
                            'JoinDate': str(datetime.datetime.now())
                        })
                        # decrement the user's currency
                        self.__subtract_from_user_currency(rDiscordUserID, rSeedAmount)
                        # return OK
                        return '', StatusCodes.OK
                    else:
                        # conflict when inserting, so a raffle with this name already exists
                        return f"A raffle with the name {rName} already exists on this server", StatusCodes.CONFLICT
            # the user does not have enough currency to start this raffle
            return 'Insufficient funds', StatusCodes.IM_A_TEAPOT
        except:
            # some error has occurred
            return '', StatusCodes.INTERNAL_SERVER_ERROR

    # adds currency to a raffle
    def join_raffle(self, rDiscordUserID, rServerID, rRaffle, rAmount):
        try:
            userCurrenyQuery = self.db.select(['Currency'], 'discordusers',
                f"DiscordUserID = '{rDiscordUserID}'").getRows()
            if len(userCurrenyQuery) > 0:
                userCurrency = userCurrenyQuery[0]['Currency']
                # make sure the user has enough currency to start this raffle
                if userCurrency >= rAmount:
                    # if a raffle exists on this server with the same name
                    raffleQueryDataTable = self.db.select(['RaffleID', 'Currency'], 'raffles',
                        f"Name = '{rRaffle}' AND ServerID = '{rServerID}'")
                    print(str(raffleQueryDataTable))
                    raffleQueryDataTable = raffleQueryDataTable.getRows()
                    if len(raffleQueryDataTable) == 1:
                        # get the RaffleID
                        raffleID = raffleQueryDataTable[0]['RaffleID']
                        currentCurrency = raffleQueryDataTable[0]['Currency']
                        # insert into DiscordUserRaffles table
                        self.db.insertOne('discorduserraffles', ['DiscordUserID', 'RaffleID', 'JoinDate'], {
                            'DiscordUserID': rDiscordUserID,
                            'RaffleID': raffleID,
                            'JoinDate': str(datetime.datetime.now())
                        })
                        # update the Raffles table
                        self.__add_currency_to_raffle(raffleID, rAmount)
                        # decrement the user's currency
                        self.__subtract_from_user_currency(rDiscordUserID, rAmount)
                        # query the DB for the return statement
                        raffle = eval(str(self.db.select(['*'], 'raffles', f"RaffleID = '{raffleID}'").getRows()[0]))
                        discordusers = self.__get_discordusers_in_raffle(raffleID)
                        # return OK
                        return {
                            'DiscordUsers': discordusers,
                            'Raffle': raffle
                        }, StatusCodes.OK
                    else:
                        # raffle with the passed name was not found on the server
                        return f"A raffle with the name {rRaffle} was not found on this server",\
                            StatusCodes.NOT_FOUND
            # the user does not have enough currency to start this raffle
            return 'Insufficient funds', StatusCodes.IM_A_TEAPOT
        except:
            # some error has occurred
            return '', StatusCodes.INTERNAL_SERVER_ERROR

    # returns all of the raffles that are currently available on the specified server
    def get_raffles(self, rServerID):
        try:
            raffles = self.db.select(['*'], 'raffles', f"ServerID = '{rServerID}'").getRows()
            # return list of raffleinfos
            return [{
                'DiscordUsers': self.__get_discordusers_in_raffle(raffle['RaffleID']),
                'Raffle': eval(str(raffle))
            } for raffle in raffles], StatusCodes.OK
        except:
            # some error has occurred
            return '', StatusCodes.INTERNAL_SERVER_ERROR


    # returns all of the raffles that are currently available on the specified server
    def get_historic_raffles(self, rDiscordUserID):
        try:
            result = self.db.select(['discorduserraffles.DiscordUserID', 'discorduserraffles.RaffleID',
                'CASE WHEN rafflehistory.ServerID IS NOT NULL THEN rafflehistory.ServerID ELSE raffles.ServerID END AS ServerID',
                'CASE WHEN rafflehistory.Name IS NOT NULL THEN rafflehistory.Name ELSE raffles.Name END AS Name',
                'CASE WHEN rafflehistory.EndTime IS NOT NULL THEN rafflehistory.EndTime ELSE raffles.EndTime END AS EndTime',
                'CASE WHEN rafflehistory.Currency IS NOT NULL THEN rafflehistory.Currency ELSE raffles.Currency END AS Currency',
                'rafflehistory.WinnerDiscordUserID'], '''
                discorduserraffles
                LEFT JOIN rafflehistory ON discorduserraffles.RaffleID = rafflehistory.RaffleID
                LEFT JOIN raffles ON discorduserraffles.RaffleID = raffles.RaffleID''',
                f"discorduserraffles.DiscordUserID = '{rDiscordUserID}'")
            # return list of raffleinfos
            return eval(str(result)), StatusCodes.OK
        except:
            # some error has occurred
            return '', StatusCodes.INTERNAL_SERVER_ERROR
    
    # returns all of the raffles that are going to end within the given number of milliseconds
    def get_raffles_ending_in_millis(self, rMillis):
        try:
            # calculate time
            nowtime = datetime.datetime.now().timestamp()
            endTime = str(datetime.datetime.fromtimestamp(int(nowtime + (rMillis / 1000))))
            # query Raffles table
            raffles = self.db.select(['*'], 'raffles', f"EndTime < '{endTime}'")
            # return list of raffles
            return eval(str(raffles)), StatusCodes.OK
        except:
            # some error has occurred
            return '', StatusCodes.INTERNAL_SERVER_ERROR

    # ends the specified raffle if the user who
    #  requested this is qualified to end the raffle
    def end_raffle(self, rDiscordUserID, rServerID, rRaffle):
        try:
            print('end_raffle')
            raffle = self.db.select(['*'], 'raffles',\
                f"ServerID = '{rServerID}' AND Name = '{rRaffle}'").getRows()
            if len(raffle) == 1:
                # if the user who is ending this raffle is the bot or
                #  is the user who started this raffle
                if rDiscordUserID in ['0', raffle[0]['DiscordUserID']]:
                    discordusersinraffle = self.__get_discordusers_in_raffle(raffle[0]['RaffleID'])
                    winner = random.choice(discordusersinraffle)
                    # add the total currency for this raffle to the winner's currency
                    self.__add_to_user_currency(winner['DiscordUserID'], raffle[0]['Currency'])
                    nowtime = datetime.datetime.now().timestamp()
                    endTime = datetime.datetime.fromtimestamp(int(nowtime))
                    self.db.insertOne('rafflehistory', ['RaffleID', 'ServerID', 'Name', 'EndTime', 'Currency', 'DiscordUserID', 'WinnerDiscordUserID'], {
                        'RaffleID': raffle[0]['RaffleID'],
                        'ServerID': raffle[0]['ServerID'],
                        'Name': raffle[0]['Name'],
                        'EndTime': str(endTime),
                        'Currency': raffle[0]['Currency'],
                        'DiscordUserID': raffle[0]['DiscordUserID'],
                        'WinnerDiscordUserID': winner['DiscordUserID']
                    })
                    # delete the raffle
                    self.db.delete('raffles', f"RaffleID = {raffle[0]['RaffleID']}")
                    return {
                        'Winner': winner,
                        'RaffleInfo': {
                            'DiscordUsers': discordusersinraffle,
                            'Raffle': eval(str(raffle[0]))
                        }
                    }, StatusCodes.OK
                else:
                    # only the user who started the raffle or the bot can end a raffle
                    return 'You do not have the authority to end this raffle',\
                        StatusCodes.FORBIDDEN
            else:
                # raffle with the passed name was not found on the server
                return f"A raffle with the name {rRaffle} was not found on this server",\
                    StatusCodes.NOT_FOUND
        except Exception as e:
            # some error has occurred
            return e, StatusCodes.INTERNAL_SERVER_ERROR
