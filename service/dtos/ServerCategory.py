from helpers import DTO

# ServerCategories Table
class ServerCategory(DTO):
    def __init__(self, dictionary):
        props = ['ServerID', 'CategoryID', 'Enabled']
        super(ServerCategory, self).__init__(dictionary, props)
