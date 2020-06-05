from package.query_db import query
from package.lambda_exception import LambdaException

def add_colleges(event, context):
    college = event['college']
    name_param = {'name' : 'college', 'value' : {'stringValue' : college}}
    id_sql = "SELECT college_id FROM college ORDER BY college_id DESC LIMIT 1;"
    try:
        college_id = query(id_sql)['records']
        if len(college_id) > 0:
            if 'longValue' in college_id[0][0]:
                college_id = college_id[0][0]['longValue'] + 1
            else:
                raise LambdaException("500: college_id is invalid")
        else:
            college_id = 1
        college_id_param = {'name' : 'college_id', 'value' : {'longValue' : college_id}}

    except Exception as e:
        raise LambdaException("Failed to get college ids: " + str(e))

    add_sql = "INSERT INTO college VALUES (:college_id, :college)"
    params = [name_param, college_id_param]
    try:
        query(add_sql, params)
        return {
            'body' : "college successfully created"
        }
    except Exception as e:
        raise LambdaException("Failed to add college: " + str(e))