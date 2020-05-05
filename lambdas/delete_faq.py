from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    faq_id = int(event['faq_id'])
    faq_id_param = {'name' : 'faq_id', 'value' : {'longValue' : faq_id}}

    delete_faq_sql = "DELETE FROM FAQ WHERE faq_id = :faq_id"
    params = [faq_id_param]

    try:
        query(delete_faq_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to delete FAQ, " + str(e))

    return {
        'body' : "Successfully deleted FAQ"
    }