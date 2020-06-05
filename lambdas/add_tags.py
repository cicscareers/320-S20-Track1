from package.query_db import query
from package.lambda_exception import LambdaException

def add_tags(event, context):
    tag_type = event['tag_type']
    name_param = {'name' : 'tag_type', 'value' : {'stringValue' : tag_type}}
    id_sql = "SELECT tag_type_id FROM tag_type ORDER BY tag_type_id DESC LIMIT 1;"
    try:
        tag_type_id = query(id_sql)['records']
        if len(tag_type_id) > 0:
            if 'longValue' in tag_type_id[0][0]:
                tag_type_id = tag_type_id[0][0]['longValue'] + 1
            else:
                raise LambdaException("500: tag_type_id is invalid")
        else:
            tag_type_id = 1
        tag_type_id_param = {'name' : 'tag_type_id', 'value' : {'longValue' : tag_type_id}}

    except Exception as e:
        raise LambdaException("Failed to get tag_type ids: " + str(e))

    add_sql = "INSERT INTO tag_type VALUES (:tag_type_id, :tag_type)"
    params = [name_param, tag_type_id_param]
    try:
        query(add_sql, params)
        return {
            'statusCode': 201,
            'body' : "tag_type successfully created"
        }
    except Exception as e:
        raise LambdaException("Failed to add tag_type: " + str(e))