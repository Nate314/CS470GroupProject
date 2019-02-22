from DTO import DTO

# Raffles Table
class Raffle(DTO):
    def __init__(self, dictionary):
        props = ['RaffleID', 'ServerID', 'Name', 'EndTime', 'Currency']
        super(Raffle, self).__init__(dictionary, props)
