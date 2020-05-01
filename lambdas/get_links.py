from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    get_links_sql = "SELECT link_type FROM link;"

    try:
        links = query(get_links_sql)['records']
    except Exception as e:
        raise LambdaException("500: Failed to get links, " + str(e))

    response = {
        "links" : []
    }

    for link in links:
        curr_links = response["links"]
        curr_links.append(link['stringValue'])
        records['links'] = curr_links

    return response