from package.query_db import query
from package.lambda_exception import LambdaException

def update_minors(event, context):

    minor_id = int(event['minor_id'])
    id_param = {'name' : 'minor_id', 'value' : {'longValue' : minor_id}}

    minor = event['minor']
    minor_param = {'name' : 'minor', 'value' : {'stringValue' : minor}}

    update_sql = "UPDATE minor SET minor = :minor WHERE minor_id = :minor_id"
    params = [id_param, minor_param]

    try:
        query(update_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to update minor, " + str(e))

    return {
        'body' : "Successfully updated minor"
    }