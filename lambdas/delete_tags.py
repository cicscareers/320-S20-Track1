from package.query_db import query
from package.lambda_exception import LambdaException

def delete_tags(event, context):
    tag_type_id = int(event['tag_type_id'])
    id_param = {'name' : 'tag_type_id', 'value' : {'longValue' : tag_type_id}}
    delete_sql = "DELETE FROM tag_type WHERE tag_type_id = :tag_type_id"
    params = [id_param]
    try:
        query(delete_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to delete tag_type, " + str(e))
    return {
        'statusCode': 201,
        'body' : "Successfully deleted tag_type"
    }