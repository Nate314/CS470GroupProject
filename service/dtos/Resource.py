from helpers import DTO

# Resources Table
class Resource(DTO):
    def __init__(self, dictionary):
        props = ['ResourceID', 'Link']
        super(Resource, self).__init__(dictionary, props)
