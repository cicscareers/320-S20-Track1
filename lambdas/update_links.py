from package.query_db import query
from package.lambda_exception import LambdaException

def update_links(event, context):

    link_id = int(event['link_id'])
    id_param = {'name' : 'link_id', 'value' : {'longValue' : link_id}}

    link_type = event['link_type']
    link_param = {'name' : 'link_type', 'value' : {'stringValue' : link_type}}

    update_sql = "UPDATE link SET link_type = :link_type WHERE link_id = :link_id"
    params = [id_param, link_param]

    try:
        query(update_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to update link, " + str(e))

    return {
        'body' : "Successfully updated link"
    }