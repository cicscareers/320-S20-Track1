gitimport json
from package.query_db import query
from package.dictionary_to_list import dictionary_to_list
from package.lambda_exception import LambdaException
from boto3 import client as boto3_client

def cancel_appointment(event, context):
    appointment_id_to_delete = int(event['appointment_id'])
    cancel_reason = event['cancel_reason']

    appointment_id_dic = {}
    cancel_reason_dic = {}
    if appointment_id_to_delete == None:
       raise LambdaException("400: appointment_id was not given")
    
    if cancel_reason == None:
        raise LambdaException("400: cancel_reason was not given")

    appointment_id_dic['appointment_id'] = appointment_id_to_delete
    cancel_reason_dic['cancel_reason'] = cancel_reason

    
    sql_select = """SELECT appointment_id FROM scheduled_appointments WHERE appointment_id = :appointment_id;"""
    sql_parameters = dictionary_to_list(appointment_id_dic)
    response = query(sql_select, sql_parameters)
    if response['records'] == []:
        raise LambdaException("404: This appointment does not exist")


    sql_update = """ UPDATE scheduled_appointments SET cancelled = True, cancel_reason = :cancel_reason WHERE appointment_id = :appointment_id"""
    cancel_reason_dic['appointment_id'] = appointment_id_to_delete
    sql_parameters = dictionary_to_list(cancel_reason_dic)
    response = query(sql_update, sql_parameters)
    

    # send cancellation email
    
    sql_email = """SELECT SA.supporter_id, SA.time_of_appt, SA.location, SAR.student_id, 
                SS.duration, ST.specialization_type
                FROM scheduled_appointments SA, student_appointment_relation SAR, specializations_for_appointment SFA, supporter_specializations SS, specialization_type ST
                WHERE SS.specialization_type_id = SFA.specialization_type_id 
                AND ST.specialization_type_id = SFA.specialization_type_id
                AND SS.supporter_id = SA.supporter_id
                AND SFA.appointment_id = SA.appointment_id
                AND SAR.appointment_id = SA.appointment_id
                AND SA.appointment_id = :appointment_id;"""
                        
    sql_parameters = [
        {'name': 'appointment_id', 'value': {'longValue': appointment_id_to_delete}}
    ]
    
    try:
        response = query(sql_email, sql_parameters)["records"]
        
    except Exception as e:
        raise LambdaException("500: Failed to get appointment details. " + str(e))
    
    email_event = {}
    
    if response == []:
        raise LambdaException("404: Appointment does not exist. " + str(e))
    else:
        email_event["supporter_id"] = response[0][0]["longValue"]
        email_event["time_of_appt"] = response[0][1]["stringValue"]
        email_event["location"] = response[0][2]["stringValue"]
        email_event["student_id"] = response[0][3]["longValue"]
        email_event["duration"] = response[0][4]["longValue"]
        email_event["appointment_type"] = response[0][5]["stringValue"]
        email_event["to_cancel"] = True
    
    lambda_client = boto3_client('lambda')
    
    if len(email_event) == 0:
        raise LambdaException("404: Appointment does not exist. " + str(e))
    
    try:
        response = lambda_client.invoke(FunctionName="appointment_email",
                                           InvocationType='Event',
                                           Payload=json.dumps(email_event))
    except Exception as e:
        raise LambdaException("404: Unable to send cancellation email")

    #Return success code if appointment has been deleted
    return{
        "statusCode": 200
    }