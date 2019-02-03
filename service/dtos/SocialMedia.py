from DTO import DTO

# SocialMedias Table
class SocialMedia(DTO):
    def __init__(self, dictionary):
        props = ['SocialMediaID', 'Name', 'URL', 'Picture']
        super(SocialMedia, self).__init__(dictionary, props)
