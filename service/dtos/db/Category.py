from DTO import DTO

# Categories Table
class Category(DTO):
    def __init__(self, dictionary):
        props = ['CategoryID', 'Title']
        super(Category, self).__init__(dictionary, props)
