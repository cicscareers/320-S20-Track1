import json
from package.query_db import query
from package.dictionary_to_list import dictionary_to_list
from package.lambda_exception import LambdaException


def update_supporter_status(event, context):
    supporter_id = int(event['supporter_id'])
    supporter_id_dic = {}

    if supporter_id == None:
        raise LambdaException("400: supporter_id was not given")

    supporter_id_dic['supporter_id'] = supporter_id
    sql_select = """SELECT supporter_id FROM supporters WHERE supporter_id = :supporter_id"""
    sql_paramters_dic = dictionary_to_list(supporter_id_dic)
    response = query(sql_select, sql_paramters_dic)
    if response['records'] == []:
         raise LambdaException("404: this supporter does not exist")

    sql_update = """UPDATE supporters set is_pending = False WHERE supporter_id = :supporter_id"""
    response = query(sql_update, sql_paramters_dic)

    return{
        "statusCode": 200
    }
