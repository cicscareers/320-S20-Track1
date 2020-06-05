from package.query_db import query
from package.lambda_exception import LambdaException

def delete_minors(event, context):
    minor_id = int(event['minor_id'])
    id_param = {'name' : 'minor_id', 'value' : {'longValue' : minor_id}}
    delete_sql = "DELETE FROM minor WHERE minor_id = :minor_id"
    params = [id_param]
    try:
        query(delete_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to delete minor, " + str(e))
    return {
        'body' : "Successfully deleted minor"
    }