from package.query_db import query
from package.lambda_exception import LambdaException

def update_specialization_types(event, context):

    specialization_type_id = int(event['specialization_type_id'])
    id_param = {'name' : 'specialization_type_id', 'value' : {'longValue' : specialization_type_id}}

    specialization_type = event['specialization_type']
    specialization_type_param = {'name' : 'specialization_type', 'value' : {'stringValue' : specialization_type}}

    update_sql = "UPDATE specialization_type SET specialization_type = :specialization_type WHERE specialization_type_id = :specialization_type_id"
    params = [id_param, specialization_type_param]

    try:
        query(update_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to update specialization_type, " + str(e))

    return {
        'body' : "Successfully updated specialization_type"
    }