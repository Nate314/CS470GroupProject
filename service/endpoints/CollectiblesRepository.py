from helpers import Database, StatusCodes
from .CommonRepository import CommonRepository
import datetime

# Repositories retrieve data from the database
class CollectiblesRepository:

    # initialize CollectiblesRepository
    def __init__(self):
        self.db = Database()
        self._commonRepository = CommonRepository()

    def get_collectibles_for_user(self, DiscordUserID):
        try:
            result = eval(str(self.db.select(['*'], 'discordusercollectibles'
                + ' JOIN collectibles ON collectibles.CollectibleID = discordusercollectibles.CollectibleID',
                'discordusercollectibles.DiscordUserID = %s', [DiscordUserID])))
            return result, StatusCodes.OK
        except:
            return 'error in get_collectibles_for_user', StatusCodes.INTERNAL_SERVER_ERROR
    
    def purchase(self, rDiscordUserID, rCollectibleName):
        try:
            userCurrenyQuery = self.db.select(['Currency'], 'discordusers', 'DiscordUserID = %s', [rDiscordUserID]).getRows()
            if len(userCurrenyQuery) > 0:
                userCurrency = userCurrenyQuery[0]['Currency']
                collectibleQuery = self.db.select(['*'], 'collectibles', 'Name = %s', [rCollectibleName]).getRows()
                if len(collectibleQuery) > 0:
                    collectibleItem = collectibleQuery[0]
                    if len(self.db.select(['*'], 'discordusercollectibles', 'DiscordUserID = %s AND CollectibleID = %s', [rDiscordUserID, collectibleItem['CollectibleID']]).getRows()) == 0:
                        # make sure the user has enough currency to purchase this collectible
                        collectiblePrice = int(collectibleItem['Currency'])
                        if userCurrency >= collectiblePrice:
                            # insert into DiscorduserCollectibles table
                            self.db.insertOne('discordusercollectibles', ['DiscordUserID', 'CollectibleID', 'Date'], {
                                'DiscordUserID': rDiscordUserID,
                                'CollectibleID': collectibleItem['CollectibleID'],
                                'Date': str(datetime.datetime.now())
                            })
                            # decrement the user's currency
                            print('line 40')
                            self._commonRepository.subtract_from_user_currency(rDiscordUserID, collectiblePrice)
                            print('line 42')
                            # return OK
                            return f'Successfully purchased {rCollectibleName}', StatusCodes.OK
                        else:
                            # the user does not have enough currency to purchase this collectible
                            return 'Insufficient funds', StatusCodes.IM_A_TEAPOT
                    else:
                        # the user has already purchased this collectible
                        return 'the user has already purchased this collectible', StatusCodes.CONFLICT
                else:
                    # no collectibles in the DB with a matching name
                    return f"Could not find a collectible with name '{rCollectibleName}'", StatusCodes.NOT_FOUND
        except:
            # some error has occurred
            return '', StatusCodes.INTERNAL_SERVER_ERROR
