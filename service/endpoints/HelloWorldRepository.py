from helpers import Database

# Repositories retrieve data from the database
class HelloWorldRepository:

    # initialize HelloWorldRepository
    def __init__(self):
        self.db = Database()
    
    # retrieve information for the get method on the controller
    def get_about(self):
        dt = self.db.select(['*'], 'SocialMedias')
        return eval(str(dt))
    
    # retrieve information for the get id method on the controller
    def get_id(self, id):
        return id * 10
    
    # retrieve information for the post method on the controller
    def post_test(self, body):
        return body
    
    # retrieve information for the put method on the controller
    def put_test(self, body):
        return body
    
    # retrieve information for the delete method on the controller
    def delete_test(self, body):
        return body
