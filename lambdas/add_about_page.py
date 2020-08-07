from package.query_db import query
from package.lambda_exception import LambdaException
def add_about_page(event, context):
    page_text = event['page_text']
    name_param = {'name' : 'page_text', 'value' : {'stringValue' : page_text}}
    id_sql = "SELECT about_page_id FROM about_page ORDER BY about_page_id DESC LIMIT 1;"
    try:
        about_page_id = query(id_sql)['records']
        if len(about_page_id) > 0:
            if 'longValue' in about_page_id[0][0]:
                about_page_id = about_page_id[0][0]['longValue'] + 1
            else:
                raise LambdaException("500: about_page_id is invalid")
        else:
            about_page_id = 1
        about_page_id_param = {'name' : 'about_page_id', 'value' : {'longValue' : about_page_id}}

    except Exception as e:
        raise LambdaException("Failed to get about_page ids: " + str(e))

    add_sql = "INSERT INTO about_page VALUES (:about_page_id, :page_text)"
    params = [name_param, about_page_id_param]
    try:
        query(add_sql, params)
        return {
            'body' : "page_text successfully created"
        }
    except Exception as e:
        raise LambdaException("Failed to add page_text: " + str(e))