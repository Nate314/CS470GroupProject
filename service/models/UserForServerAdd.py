from helpers import DTO

class UserForAddDTO(DTO):
    def __init__(self, dictionary):
        props = ['ServerID', 'JoinDate']
        super(UserForAddDTO, self).__init__(dictionary, props)
