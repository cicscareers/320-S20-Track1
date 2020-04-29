import json
from package.query_db import query
from package.dictionary_to_list import dictionary_to_list

def update_supporter_status(event, context):
    supporter_id = event['supporter_id']
    supporter_id_dic = {}

    if suppprter_id == None:
        return{
            "statusCode": 404
        }

    supporter_id_dic['supporter_id'] = supporter_id
    sql_select = """SELECT supporter_id FROM supporters WHERE supporter_id = :supporter_id"""
    sql_paramters_dic = dictionary_to_list(supporter_id_dic)
    response = query(sql_select, sql_paramters_dic)
    if response['records'] == []:
        return{
            "statusCode": 404
        }

    sql_update = """UPDATE supporters set is_pending = True WHERE supporter_id = :supporter_id"""
    response = query(sql_update, sql_paramters_dic)
