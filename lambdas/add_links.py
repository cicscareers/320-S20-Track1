from package.query_db import query
from package.lambda_exception import LambdaException
def add_links(event, context):
    link = event['link_type']
    name_param = {'name' : 'link', 'value' : {'stringValue' : link}}
    id_sql = "SELECT link_id FROM link ORDER BY link_id DESC LIMIT 1;"
    try:
        link_id = query(id_sql)['records']
        if len(link_id) > 0:
            if 'longValue' in link_id[0][0]:
                link_id = link_id[0][0]['longValue'] + 1
            else:
                raise LambdaException("500: link_id is invalid")
        else:
            link_id = 1
        link_id_param = {'name' : 'link_id', 'value' : {'longValue' : link_id}}

    except Exception as e:
        raise LambdaException("Failed to get link ids: " + str(e))

    add_sql = "INSERT INTO link VALUES (:link_id, :link)"
    params = [name_param, link_id_param]
    try:
        query(add_sql, params)
        return {
            'body' : "link successfully created"
        }
    except Exception as e:
        raise LambdaException("Failed to add link: " + str(e))
