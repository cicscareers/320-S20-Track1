from package.query_db import query
from package.lambda_exception import LambdaException
def update_about_page(event, context):

    about_page_id = int(event['about_page_id'])
    id_param = {'name' : 'about_page_id', 'value' : {'longValue' : about_page_id}}

    page_text = event['page_text']
    page_text_param = {'name' : 'page_text', 'value' : {'stringValue' : page_text}}

    update_sql = "UPDATE about_page SET page_text = :page_text WHERE about_page_id = :about_page_id"
    params = [id_param, page_text_param]

    try:
        query(update_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to update about_page, " + str(e))

    return {
        'body' : "Successfully updated about_page"
    }