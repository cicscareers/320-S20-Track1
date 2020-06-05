from package.query_db import query
from package.lambda_exception import LambdaException

def update_tags(event, context):

    tag_type_id = int(event['tag_type_id'])
    id_param = {'name' : 'tag_type_id', 'value' : {'longValue' : tag_type_id}}

    tag_type = event['tag_type']
    tag_type_param = {'name' : 'tag_type', 'value' : {'stringValue' : tag_type}}

    update_sql = "UPDATE tag_type SET tag_type = :tag_type WHERE tag_type_id = :tag_type_id"
    params = [id_param, tag_type_param]

    try:
        query(update_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to update tag, " + str(e))

    return {
        'statusCode': 201,
        'body' : "Successfully updated tag"
    }