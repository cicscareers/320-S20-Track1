from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    get_colleges_sql = "SELECT college FROM college;"

    try:
        colleges = query(get_colleges_sql)['records']
    except Exception as e:
        raise LambdaException("500: Failed to get colleges, " + str(e))

    response = {
        "colleges" : []
    }

    for college in colleges:
        curr_colleges = response["colleges"]
        curr_colleges.append(college['stringValue'])
        records['colleges'] = curr_colleges

    return response