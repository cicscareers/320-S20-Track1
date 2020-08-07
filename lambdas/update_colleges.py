from package.query_db import query
from package.lambda_exception import LambdaException

def update_colleges(event, context):

    college_id = int(event['college_id'])
    id_param = {'name' : 'college_id', 'value' : {'longValue' : college_id}}

    college = event['college']
    college_param = {'name' : 'college', 'value' : {'stringValue' : college}}

    update_sql = "UPDATE college SET college = :college WHERE college_id = :college_id"
    params = [id_param, college_param]

    try:
        query(update_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to update college, " + str(e))

    return {
        'body' : "Successfully updated college"
    }