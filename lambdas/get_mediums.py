from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    get_mediums_sql = "SELECT medium_id, medium FROM medium;"

    try:
        mediums = query(get_mediums_sql)
    except Exception as e:
        raise LambdaException("500: Failed to get colleges, " + str(e))

    response = {
        "mediums" : []
    }

    for m_id, medium in mediums:
        curr_mediums = response["mediums"]
        next_medium = {'medium_id' : m_id, 'medium' : medium}
        curr_mediums.append(next_medium)
        records['mediums'] = curr_mediums

    return response