from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    get_mediums_sql = "SELECT medium FROM medium;"

    try:
        mediums = query(get_mediums_sql)
    except Exception as e:
        raise LambdaException("500: Failed to get colleges, " + str(e))

    response = {
        "mediums" : []
    }

    for medium in mediums:
        curr_mediums = response["mediums"]
        curr_mediums.append(medium['stringValue'])
        records['mediums'] = curr_mediums

    return response