from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    get_about_page_sql = "SELECT about_page_id, page_text FROM about_page;"

    try:
        about_page = query(get_about_page_sql)['records']
    except Exception as e:
        raise LambdaException("500: Failed to get about_page, " + str(e))

    response = {
        "about_page" : []
    }

    for abp_id, p_text in about_page:
        curr_about_page = response["about_page"]
        next_p_text = {'about_page_id' : abp_id['longvalue'], 'page_text' : p_text['stringValue']}
        curr_about_page.append(next_p_text)
        response['about_page'] = curr_about_page

    return response