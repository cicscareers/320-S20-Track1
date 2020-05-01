from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    get_specialization_types_sql = "SELECT specialization_type FROM specialization_type;"

    try:
        specialization_types = query(get_specialization_types_sql)['records']
    except Exception as e:
        raise LambdaException("500: Failed to get specialization_types, " + str(e))

    response = {
        "specialization_types" : []
    }

    for specialization_type in specialization_types:
        curr_specialization_types = response["specialization_types"]
        curr_specialization_types.append(specialization_type['stringValue'])
        records['specialization_types'] = curr_specialization_types

    return response