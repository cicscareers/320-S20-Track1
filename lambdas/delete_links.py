from package.query_db import query
from package.lambda_exception import LambdaException
def delete_links(event, context):
    link_id = int(event['link_id'])
    id_param = {'name' : 'link_id', 'value' : {'longValue' : link_id}}
    delete_sql = "DELETE FROM link WHERE link_id = :link_id"
    params = [id_param]
    try:
        query(delete_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to delete link, " + str(e))
    return {
        'body' : "Successfully deleted link"
    }