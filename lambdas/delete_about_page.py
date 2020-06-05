from package.query_db import query
from package.lambda_exception import LambdaException

def delete_about_page(event, context):
    about_page_id = int(event['about_page_id'])
    id_param = {'name' : 'about_page_id', 'value' : {'longValue' : about_page_id}}
    delete_sql = "DELETE FROM about_page WHERE about_page_id = :about_page_id"
    params = [id_param]
    try:
        query(delete_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to delete about_page, " + str(e))
    return {
        'body' : "Successfully deleted about_page"
    }