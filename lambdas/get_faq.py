from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    get_faq_sql = "SELECT question, answer FROM FAQ;"

    try:
        faqs = query(get_faq_sql)['records']
    except Exception as e:
        raise LambdaException("500: Unable to get FAQs, " + str(e))
    
    response = {
<<<<<<< Updated upstream
        'faqs' = [],
    }

    if len(faqs) > 0:
        faqs = faqs[0]
        for q, a in faqs:
            curr_faqs = response['questions']
            curr_faqs.append((q['stringValue'], a['stringValue']))
=======
        'faqs' : [],
    }

    if len(faqs) > 0:
        for q, a in faqs:
            curr_faqs = response['faqs']
            curr_faqs.append({'question' : q['stringValue'], 'answer' : a['stringValue']})
>>>>>>> Stashed changes
            response['faqs'] = curr_faqs
            
    else:
        raise LambdaException("204: No existing FAQs")

    return response