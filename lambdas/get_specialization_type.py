from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    get_specialization_types_sql = "SELECT specialization_type_id, specialization_type FROM specialization_type;"

    try:
        specialization_types = query(get_specialization_types_sql)['records']
    except Exception as e:
        raise LambdaException("500: Failed to get specialization_types, " + str(e))

    response = {
        "specialization_types" : []
    }

    for spec_type_id, specialization_type in specialization_types:
        curr_specialization_types = response["specialization_types"]
        next_spec_types = {'specialization_type_id' : spec_type_id, 'specialization_type' : specialization_type}
        curr_specialization_types.append(next_spec_types)
        records['specialization_types'] = curr_specialization_types

    return response