from package.query_db import query
from package.lambda_exception import LambdaException

def delete_specialization_types(event, context):
    specialization_type_id = int(event['specialization_type_id'])
    id_param = {'name' : 'specialization_type_id', 'value' : {'longValue' : specialization_type_id}}
    delete_sql = "DELETE FROM specialization_type WHERE specialization_type_id = :specialization_type_id"
    params = [id_param]
    try:
        query(delete_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to delete specialization_type, " + str(e))
    return {
        'body' : "Successfully deleted specialization_type"
    }