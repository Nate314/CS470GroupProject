from DTO import DTO

# Descriptions Table
class Description(DTO):
    def __init__(self, dictionary):
        props = ['DescriptionID', 'Title', 'ResourceID']
        super(Description, self).__init__(dictionary, props)
