from package.query_db import query
from package.lambda_exception import LambdaException

def delete_colleges(event, context):
    college_id = int(event['college_id'])
    id_param = {'name' : 'college_id', 'value' : {'longValue' : college_id}}
    delete_sql = "DELETE FROM college WHERE college_id = :college_id"
    params = [id_param]
    try:
        query(delete_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to delete college, " + str(e))
    return {
        'body' : "Successfully deleted college"
    }