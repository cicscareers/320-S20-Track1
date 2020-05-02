from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    get_majors_sql = "SELECT major_id, major FROM major;"

    try:
        majors = query(get_majors_sql)['records']
    except Exception as e:
        raise LambdaException("500: Failed to get majors, " + str(e))

    response = {
        "majors" : []
    }

    for m_id, major in majors:
        curr_majors = response["majors"]
        next_major = {'major_id' : m_id['longValue'], 'major' : major['stringValue']}
        curr_majors.append(next_major)
        response['majors'] = curr_majors

    return response