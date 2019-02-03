from DTO import DTO

# Embeds Table
class Embed(DTO):
    def __init__(self, dictionary):
        props = ['EmbedID', 'CommandID', 'SubCommandID', 'Value']
        super(Embed, self).__init__(dictionary, props)
