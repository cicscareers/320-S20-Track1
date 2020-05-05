from package.query_db import query
from package.lambda_exception import LambdaException

def add_minors(event, context):
    minor = event['minor']
    name_param = {'name' : 'minor', 'value' : {'stringValue' : minor}}
    id_sql = "SELECT minor_id FROM minor ORDER BY minor_id DESC LIMIT 1;"
    try:
        minor_id = query(id_sql)['records']
        if len(minor_id) > 0:
            if 'longValue' in minor_id[0][0]:
                minor_id = minor_id[0][0]['longValue'] + 1
            else:
                raise LambdaException("500: minor_id is invalid")
        else:
            minor_id = 1
        minor_id_param = {'name' : 'minor_id', 'value' : {'longValue' : minor_id}}

    except Exception as e:
        raise LambdaException("Failed to get minor ids: " + str(e))

    add_sql = "INSERT INTO minor VALUES (:minor_id, :minor)"
    params = [name_param, minor_id_param]
    try:
        query(add_sql, params)
        return {
            'body' : "minor successfully created"
        }
    except Exception as e:
        raise LambdaException("Failed to add minor: " + str(e))