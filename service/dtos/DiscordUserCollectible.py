from helpers import DTO

# DiscordUserCollectibles Table
class DiscordUserCollectible(DTO):
    def __init__(self, dictionary):
        props = ['DiscordUserID', 'CollectibleID', 'Date']
        super(DiscordUserCollectible, self).__init__(dictionary, props)
