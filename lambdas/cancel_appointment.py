import json
from package.query_db import query
from package.dictionary_to_list import dictionary_to_list

def cancel_appointment(event, context):
    appointment_id_to_delete = event['appointment_id']
    cancel_reason = event['cancel_reason']
    #Connect to table
    #client = boto3.client('rds-data')

    appointment_id_dic = {}
    cancel_reason_dic = {}
    if appointment_id_to_delete != None:
        appointment_id_dic['appointment_id'] = appointment_id
    
    if cancel_reason != None:
        cancel_reason_dic['cancel_reason'] = cancel_reason

    
    sql_select = """SELECT appointment_id FROM scheduled_appointments WHERE appointment_id = :appointment_id;"""
    sql_parameters = dictionary_to_list(appointment_id_dic)
    response = query(sql_select, sql_parameters)
    if response == []:
        return{
            'statusCode': 404
        }

    """
    #Check if appointment exists
    existing_user = client.execute_statement(
        secretArn = "arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7", 
        database = "postgres",
        resourceArn = "arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql = "SELECT appointment_id FROM scheduled_appointments WHERE appointment_id = '%d';" % (appointment_id_to_delete)
    )
    

    if existing_user['records'] == []:
        return{
            'statuscode' : 404
        }

    """

    #cancel_bool = 'True'
    #This is the query that we need to execute
    #sql_update = "UPDATE scheduled_appointments SET cancelled = '%s', cancel_reason = '%s' WHERE appointment_id = '%d';" % (cancel_bool, cancel_reason, appointment_id_to_delete)
    new_cancel_reason = []
    if "\'" in cancel_reason:
        index_ap = cancel_reason.index("\'")
        cancel_reason = cancel_reason[:index_ap] + '\'' + cancel_reason[index_ap:]
        cancel_reason_dic['cancel_reason'] = cancel_reason

    sql_update = """ UPDATE scheduled_appointments SET cancelled = True, cancel_reason = :cancel_reason WHERE appointment_id = :appointment_id"""
    #Accessing database and executing query
    """
    client.execute_statement(
        secretArn = "arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7", 
        database = "postgres",
        resourceArn = "arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql = updateQuery
    )
    """
    cancel_reason_dic['appointment_id'] = appointment_id
    sql_parameters = dictionary_to_list(cancel_reason_dic)
    response = query(sql_update, sql_parameters)

    #Return success code if appointment has been deleted
    return{
        statusCode: "200"
    }