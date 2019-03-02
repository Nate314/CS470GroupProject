from helpers import DTO

class UserForAddDTO(DTO):
    def __init__(self, dictionary):
        props = ['DiscordUserID', 'UserName', 'UserHash', 'Servers']
        super(UserForAddDTO, self).__init__(dictionary, props)
