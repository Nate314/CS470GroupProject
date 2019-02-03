from DTO import DTO

# SubCommands Table
class SubCommand(DTO):
    def __init__(self, dictionary):
        props = ['SubCommandID', 'CommandID', 'Name', 'Description']
        super(SubCommand, self).__init__(dictionary, props)
