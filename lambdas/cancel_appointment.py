import constants
import json
import boto3

def cancel_appointment(event, context):
    appointment_id_to_delete = event['appointment_id']
    cancel_reason = event['cancel_reason']
    #Connect to table
    client = boto3.client('rds-data')

    #Check if appointment exists
    existing_user = client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "SELECT appointment_id FROM scheduled_appointments WHERE appointment_id = '%d';" % (appointment_id_to_delete)
    )

    if existing_user['records'] == []:
        return{
            'statuscode' : 404
        }

    cancel_bool = 'True'
    updateQuery = "UPDATE scheduled_appointments SET cancel = '%s', cancel_reason = '%s' WHERE appointment_id = '%d';" % (cancel_bool, cancel_reason, appointment_id_to_delete)

    client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = updateQuery
    )

    return{
        statusCode: "200"
    }