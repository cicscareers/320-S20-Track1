from package.query_db import query
from package.lambda_exception import LambdaException
def add_mediums(event, context):
    medium = event['medium']
    name_param = {'name' : 'medium', 'value' : {'stringValue' : medium}}
    id_sql = "SELECT medium_id FROM medium ORDER BY medium_id DESC LIMIT 1;"
    try:
        medium_id = query(id_sql)['records']
        if len(medium_id) > 0:
            if 'longValue' in medium_id[0][0]:
                medium_id = medium_id[0][0]['longValue'] + 1
            else:
                raise LambdaException("500: medium_id is invalid")
        else:
            medium_id = 1
        medium_id_param = {'name' : 'medium_id', 'value' : {'longValue' : medium_id}}

    except Exception as e:
        raise LambdaException("Failed to get medium ids: " + str(e))

    add_sql = "INSERT INTO medium VALUES (:medium_id, :medium)"
    params = [name_param, medium_id_param]
    try:
        query(add_sql, params)
        return {
            'body' : "medium successfully created"
        }
    except Exception as e:
        raise LambdaException("Failed to add medium: " + str(e))