import json
from package.query_db import query
from package.dictionary_to_list import dictionary_to_list

def cancel_appointment(event, context):
    appointment_id_to_delete = event['appointment_id']
    cancel_reason = event['cancel_reason']

    appointment_id_dic = {}
    cancel_reason_dic = {}
    if appointment_id_to_delete == None:
        return{
            "statusCode": 404 
        }
    
    if cancel_reason == None:
        return{
            "statusCode": 404 
        }

    appointment_id_dic['appointment_id'] = appointment_id_to_delete
    cancel_reason_dic['cancel_reason'] = cancel_reason

    
    sql_select = """SELECT appointment_id FROM scheduled_appointments WHERE appointment_id = :appointment_id;"""
    sql_parameters = dictionary_to_list(appointment_id_dic)
    response = query(sql_select, sql_parameters)
    if response['records'] == []:
        return{
            'statusCode': 404
        }


    sql_update = """ UPDATE scheduled_appointments SET cancelled = True, cancel_reason = :cancel_reason WHERE appointment_id = :appointment_id"""
    cancel_reason_dic['appointment_id'] = appointment_id_to_delete
    sql_parameters = dictionary_to_list(cancel_reason_dic)
    response = query(sql_update, sql_parameters)

    #Return success code if appointment has been deleted
    return{
        "statusCode": 200
    }