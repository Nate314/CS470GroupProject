from helpers import DTO

# SocialMedias Table
class SocialMedia(DTO):
    def __init__(self, dictionary):
        props = ['SocialMediaID', 'Title', 'URL', 'ResourceID']
        super(SocialMedia, self).__init__(dictionary, props)
