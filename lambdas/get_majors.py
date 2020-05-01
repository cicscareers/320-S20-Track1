from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    get_majors_sql = "SELECT major FROM major;"

    try:
        majors = query(get_majors_sql)['records']
    except Exception as e:
        raise LambdaException("500: Failed to get majors, " + str(e))

    response = {
        "majors" : []
    }

    for major in majors:
        curr_majors = response["majors"]
        curr_majors.append(major['stringValue'])
        records['majors'] = curr_majors

    return response