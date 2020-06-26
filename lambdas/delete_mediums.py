from package.query_db import query
from package.lambda_exception import LambdaException

def delete_mediums(event, context):
    medium_id = int(event['medium_id'])
    id_param = {'name' : 'medium_id', 'value' : {'longValue' : medium_id}}
    delete_sql = "DELETE FROM medium WHERE medium_id = :medium_id"
    params = [id_param]
    try:
        query(delete_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to delete medium, " + str(e))
    return {
        'body' : "Successfully deleted medium"
    }