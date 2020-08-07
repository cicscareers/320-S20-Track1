from package.query_db import query
from package.lambda_exception import LambdaException

def block(event, context):
    id = int(event['id'])
    id_param = {'name' : 'id', 'value' : {'longValue' : id}}
    is_blocked = event['blocked']
    
    blocked_param = {'name' : 'is_blocked', 'value' : {'booleanValue' : is_blocked}}
    update_sql = "UPDATE users SET is_blocked = :is_blocked WHERE id = :id"
    params = [id_param, blocked_param]
    
    try:
        query(update_sql, params)
        
    except Exception as e:
        raise LambdaException("500: Failed to update is_blocked, " + str(e))
        
    return {
        'body' : 'Successfully updated is_blocked'
    }