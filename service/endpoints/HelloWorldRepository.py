from sql import MySQL

# Repositories retrieve data from the database
class HelloWorldRepository:

    # initialize HelloWorldRepository
    def __init__(self):
        self.mysql = MySQL('localhost', 3306, 'root', 'root', 'stocks')
    
    # retrieve information for the get method on the controller
    def get_about(self):
        dt = self.mysql.getDataTable("SELECT * FROM stockinfo")
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
