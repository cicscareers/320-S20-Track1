from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    get_minors_sql = "SELECT minor FROM minor;"

    try:
        minors = query(get_minors_sql)['records']
    except Exception as e:
        raise LambdaException("500: Failed to get minors, " + str(e))

    response = {
        "minors" : []
    }

    for minor in minors:
        curr_minors = response["minors"]
        curr_minors.append(minor['stringValue'])
        records['minors'] = curr_minors

    return response