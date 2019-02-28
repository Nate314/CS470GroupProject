from helpers import DTO

# Aliases Table
class Alias(DTO):
    def __init__(self, dictionary):
        props = ['AliasID', 'CommandID', 'Title']
        super(Alias, self).__init__(dictionary, props)
