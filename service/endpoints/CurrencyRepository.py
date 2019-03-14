from helpers import Database
import datetime

# Repositories retrieve data from the database
class CurrencyRepository:

    # initialize CurrencyRepository
    def __init__(self):
        self.db = Database()
    
    def insertTransaction(self, fromID, toID, time, amount):
        self.db.insertOne('currencytransactions',
            ['FromDiscordUserID', 'ToDiscordUserID', 'Date', 'Amount'],
            {
                'FromDiscordUserID': fromID,
                'ToDiscordUserID': toID,
                'Date': time,
                'Amount': amount
            })

    def daily(self, discordUserID, amount):
        try:
            dt = self.db.select(['*'], 'discordusers', 'DiscordUserID = \'' + discordUserID + '\'')
            user = dt.getRows()[0] if len(dt.getRows()) == 1 else None
            if user != None:
                now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                timeUntilNextDaily = 0
                if user['LastDaily'] == None:
                    timeUntilNextDaily = 60 * 60 * 24
                else:
                    nowtime = datetime.datetime.now().timestamp()
                    thentime = datetime.datetime.fromisoformat(str(user['LastDaily'])).timestamp()
                    timeUntilNextDaily = int(thentime + (60 * 60 * 24) - nowtime)
                if timeUntilNextDaily < 0:
                    userJSON = eval(str(user))
                    userJSON['LastDaily'] = now
                    userJSON['Currency'] = int(userJSON['Currency']) + amount
                    self.insertTransaction(0, discordUserID, now, amount)
                    self.db.update('discordusers',
                        ['Currency', 'LastDaily'], userJSON,
                        'DiscordUserID = ' + discordUserID)
                    return True
                else:
                    return timeUntilNextDaily * 1000
            else:
                return False
        except:
            return False
    
    def transfer(self, senderID, receiverID, amount):
        try:
            if amount > 0:
                dt1 = self.db.select(['*'], 'discordusers', 'DiscordUserID = \'' + senderID + '\'')
                dt2 = self.db.select(['*'], 'discordusers', 'DiscordUserID = \'' + receiverID + '\'')
                sendingUser = dt1.getRows()[0] if len(dt1.getRows()) == 1 else None
                receivingUser = dt2.getRows()[0] if len(dt2.getRows()) == 1 else None
                if sendingUser != None and receivingUser != None:
                    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    sendingUserJSON = eval(str(sendingUser))
                    receivingUserJSON = eval(str(receivingUser))
                    sendingUserJSON['Currency'] = int(sendingUserJSON['Currency']) - amount
                    receivingUserJSON['Currency'] = int(receivingUserJSON['Currency']) + amount
                    self.insertTransaction(senderID, receiverID, now, amount)
                    self.db.update('discordusers', ['Currency'], sendingUserJSON, 'DiscordUserID = \'' + senderID + '\'')
                    self.db.update('discordusers', ['Currency'], receivingUserJSON, 'DiscordUserID = \'' + receiverID + '\'')
                    return True
                else:
                    return False
            else:
                return 'You cannot transfer a negative amount.'
        except:
            return False
