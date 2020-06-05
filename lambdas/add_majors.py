from package.query_db import query
from package.lambda_exception import LambdaException

def add_majors(event, context):
    major = event['major']
    name_param = {'name' : 'major', 'value' : {'stringValue' : major}}
    id_sql = "SELECT major_id FROM major ORDER BY major_id DESC LIMIT 1;"
    try:
        major_id = query(id_sql)['records']
        if len(major_id) > 0:
            if 'longValue' in major_id[0][0]:
                major_id = major_id[0][0]['longValue'] + 1
            else:
                raise LambdaException("500: major_id is invalid")
        else:
            major_id = 1
        major_id_param = {'name' : 'major_id', 'value' : {'longValue' : major_id}}

    except Exception as e:
        raise LambdaException("Failed to get major ids: " + str(e))

    add_sql = "INSERT INTO major VALUES (:major_id, :major)"
    params = [name_param, major_id_param]
    try:
        query(add_sql, params)
        return {
            'body' : "major successfully created"
        }
    except Exception as e:
        raise LambdaException("Failed to add major: " + str(e))