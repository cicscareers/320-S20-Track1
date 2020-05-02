from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    get_tags_sql = "SELECT tag_type_id, tag_type FROM tag_type;"

    try:
        tags = query(get_tags_sql)['records']
    except Exception as e:
        raise LambdaException("500: Failed to get tags, " + str(e))

    response = {
        "tags" : []
    }

    for t_id, tag in tags:
        curr_tags = response["tags"]
        next_tag = {'tag_type_id' : t_id['longValue'], 'tag_type' : tag['stringValue']}
        curr_tags.append(next_tag)
        response['tags'] = curr_tags

    return response