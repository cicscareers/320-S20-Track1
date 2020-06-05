from package.query_db import query
from package.lambda_exception import LambdaException

def update_mediums(event, context):

    medium_id = int(event['medium_id'])
    id_param = {'name' : 'medium_id', 'value' : {'longValue' : medium_id}}

    medium = event['medium']
    medium_param = {'name' : 'medium', 'value' : {'stringValue' : medium}}

    update_sql = "UPDATE medium SET medium = :medium WHERE medium_id = :medium_id"
    params = [id_param, medium_param]

    try:
        query(update_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to update medium, " + str(e))

    return {
        'body' : "Successfully updated medium"
    }