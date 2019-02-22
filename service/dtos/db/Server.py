from DTO import DTO

# Servers Table
class Server(DTO):
    def __init__(self, dictionary):
        props = ['ServerID', 'ServerURL', 'CreationDate']
        super(Server, self).__init__(dictionary, props)
