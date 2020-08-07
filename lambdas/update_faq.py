from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    faq_id = int(event['faq_id'])
    faq_id_param = {'name' : 'faq_id', 'value' : {'longValue' : faq_id}}

    question = event['question']
    question_param = {'name' : 'question', 'value' : {'stringValue' : question}}

    answer = event['answer']
    answer_param = {'name' : 'answer', 'value' : {'stringValue' : answer}}

    update_faq_sql = "UPDATE FAQ SET question = :question, answer = :answer WHERE faq_id = :faq_id"
    params = [faq_id_param, question_param, answer_param]

    try:
        query(update_faq_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to update FAQs, " + str(e))

    return {
        'body' : "Successfully updated FAQ"
    }