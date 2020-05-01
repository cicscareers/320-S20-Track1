from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    get_minors_sql = "SELECT minor_id, minor FROM minor;"

    try:
        minors = query(get_minors_sql)['records']
    except Exception as e:
        raise LambdaException("500: Failed to get minors, " + str(e))

    response = {
        "minors" : []
    }

    for m_id, minor in minors:
        curr_minors = response["minors"]
        next_minor = {'minor_id' : m_id, 'minor' : minor}
        curr_minors.append(next_minor)
        records['minors'] = curr_minors

    return response