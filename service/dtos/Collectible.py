from DTO import DTO

# Collectibles Table
class Collectible(DTO):
    def __init__(self, dictionary):
        props = ['CollectibleID', 'Name', 'Picture', 'Currency']
        super(Collectible, self).__init__(dictionary, props)
