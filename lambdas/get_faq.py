from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    get_faq_sql = "SELECT faq_id, question, answer FROM FAQ;"

    try:
        faqs = query(get_faq_sql)['records']
    except Exception as e:
        raise LambdaException("500: Unable to get FAQs, " + str(e))
    
    response = {
        'faqs' : [],
    }

    if len(faqs) > 0:
        for f_id, q, a in faqs:
            curr_faqs = response['faqs']
            curr_faqs.append({'faq_id': f_id['longValue'], 'question' : q['stringValue'], 'answer' : a['stringValue']})
            response['faqs'] = curr_faqs
            
    else:
        raise LambdaException("204: No existing FAQs")

    return response