from package.query_db import query
from package.lambda_exception import LambdaException

def delete_majors(event, context):
    major_id = int(event['major_id'])
    id_param = {'name' : 'major_id', 'value' : {'longValue' : major_id}}
    delete_sql = "DELETE FROM major WHERE major_id = :major_id"
    params = [id_param]
    try:
        query(delete_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to delete major, " + str(e))
    return {
        'body' : "Successfully deleted major"
    }