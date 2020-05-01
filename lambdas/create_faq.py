from package.query_db import query
from package.lambda_exception import LambdaException

#Author: Hadley Pope
#04/30/2020

def handler(event, context):

    question = event['question']
    question_param = {'name' : 'question', 'value' : {'stringValue' : question}}

    answer = event['answer']
    answer_param = {'name' : 'answer', 'value' : {'stringValue' : answer}}

    faq_id_sql = "SELECT FAQ_id FROM FAQ ORDER BY FAQ_id DESC LIMIT 1;"
    try:
        faq_id = query(faq_id_sql)['records']
        if len(faq_id) > 0:
            if 'longValue' in faq_id:
                faq_id += 1
            else:
                raise LambdaException("500: FAQ_id is invalid")
        else:
            faq_id = 1
        faq_id_param = {'name' : 'faq_id', 'value' : {'longValue' : faq_id}}

    except Exception as e:
        raise LambdaException("Failed to get FAQ ids: " + str(e))

    add_faq_sql = "INSERT INTO FAQ (FAQ_id, question, answer) VALUES (:faq_id, :question, :answer)"
    params = [question_param, answer_param, faq_id_param]

    try:
        query(add_faq_sql, params)

        return {
            'body' : "FAQ successfully created"
        }
    except Exception as e:
        raise LambdaException("500: Failed to add FAQ: " + str(e))