# general DTO that every DTO extends
class DTO:
    def __init__(self, dictionary, props):
        self.__dict__.fromkeys(props)
        self.__dict__.update(dictionary)
    
    #PUBLIC
    # return indexed item like dictionary
    def __getitem__(self, key):
        return self.__dict__[key]
    
    #PUBLIC
    # get list of props
    def getProps(self):
        return self.__dict__.keys()
