from helpers import Database

# Repositories retrieve data from the database
class CommonRepository:

    # initialize RaffleRepository
    def __init__(self):
        self.db = Database()
    
    def add_currency_to_table(self, table, idcolumn, id, amount):
        currency = self.db.select(['Currency'], table, f"{idcolumn} = %s", [id]).getRows()[0]['Currency']
        newTotal = int(currency) + int(amount)
        self.db.update(table, ['Currency'], {
            'Currency': newTotal
        }, f"{idcolumn} = %s", [id])
    
    # adds amount to specified users's currency
    def add_currency_to_raffle(self, raffleid, amount):
        self.add_currency_to_table('raffles', 'RaffleID', raffleid, amount)
    
    # adds amount to specified users's currency
    def add_to_user_currency(self, discorduserid, amount):
        self.add_currency_to_table('discordusers', 'DiscordUserID', discorduserid, amount)
    
    # subtracts amount from specified users's currency
    def subtract_from_user_currency(self, discorduserid, amount):
        self.add_to_user_currency(discorduserid, -1 * amount)
