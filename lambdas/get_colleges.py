from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    get_colleges_sql = "SELECT college_id, college FROM college;"

    try:
        colleges = query(get_colleges_sql)['records']
    except Exception as e:
        raise LambdaException("500: Failed to get colleges, " + str(e))

    response = {
        "colleges" : []
    }

    for c_id, college in colleges:
        curr_colleges = response["colleges"]
        next_college = {'college_id' : c_id, 'college' : college}
        curr_colleges.append(next_college)
        records['colleges'] = curr_colleges

    return response