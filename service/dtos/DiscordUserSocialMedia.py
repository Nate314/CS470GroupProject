from DTO import DTO

# DiscordUserSocialMedias Table
class DiscordUserSocialMedia(DTO):
    def __init__(self, dictionary):
        props = ['DiscordUserID', 'SocialMediaID', 'Handle']
        super(DiscordUserSocialMedia, self).__init__(dictionary, props)
