from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    get_links_sql = "SELECT link_id, link_type FROM link;"

    try:
        links = query(get_links_sql)['records']
    except Exception as e:
        raise LambdaException("500: Failed to get links, " + str(e))

    response = {
        "links" : []
    }

    for l_id, link in links:
        curr_links = response["links"]
        next_link = {'link_id' : l_id['longValue'], 'link_type' : link['stringValue']}
        curr_links.append(next_link)
        response['links'] = curr_links

    return response