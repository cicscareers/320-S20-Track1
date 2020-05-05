from package.query_db import query
from package.lambda_exception import LambdaException

def update_majors(event, context):

    major_id = int(event['major_id'])
    id_param = {'name' : 'major_id', 'value' : {'longValue' : major_id}}

    major = event['major']
    major_param = {'name' : 'major', 'value' : {'stringValue' : major}}

    update_sql = "UPDATE major SET major = :major WHERE major_id = :major_id"
    params = [id_param, major_param]

    try:
        query(update_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to update major, " + str(e))

    return {
        'body' : "Successfully updated major"
    }