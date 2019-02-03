from DTO import DTO

# Commands Table
class Command(DTO):
    def __init__(self, dictionary):
        props = ['CommandID', 'Name', 'Description']
        super(Command, self).__init__(dictionary, props)
