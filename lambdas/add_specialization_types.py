from package.query_db import query
from package.lambda_exception import LambdaException

def add_specialization_types(event, context):
    specialization_type = event['specialization_type']
    name_param = {'name' : 'specialization_type', 'value' : {'stringValue' : specialization_type}}
    id_sql = "SELECT specialization_type_id FROM specialization_type ORDER BY specialization_type_id DESC LIMIT 1;"
    try:
        specialization_type_id = query(id_sql)['records']
        if len(specialization_type_id) > 0:
            if 'longValue' in specialization_type_id[0][0]:
                specialization_type_id = specialization_type_id[0][0]['longValue'] + 1
            else:
                raise LambdaException("500: specialization_type_id is invalid")
        else:
            specialization_type_id = 1
        specialization_type_id_param = {'name' : 'specialization_type_id', 'value' : {'longValue' : specialization_type_id}}

    except Exception as e:
        raise LambdaException("Failed to get specialization_type ids: " + str(e))

    add_sql = "INSERT INTO specialization_type VALUES (:specialization_type_id, :specialization_type)"
    params = [name_param, specialization_type_id_param]
    try:
        query(add_sql, params)
        return {
            'body' : "specialization_type successfully created"
        }
    except Exception as e:
        raise LambdaException("Failed to add specialization_type: " + str(e))