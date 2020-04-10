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
        secretArn = "arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7", 
        database = "postgres",
        resourceArn = "arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql = "SELECT appointment_id FROM scheduled_appointments WHERE appointment_id = '%d';" % (appointment_id_to_delete)
    )

    if existing_user['records'] == []:
        return{
            'statuscode' : 404
        }

    cancel_bool = 'True'
    #This is the query that we need to execute
    updateQuery = "UPDATE scheduled_appointments SET cancelled = '%s', cancel_reason = '%s' WHERE appointment_id = '%d';" % (cancel_bool, cancel_reason, appointment_id_to_delete)

    #Accessing database and executing query
    client.execute_statement(
        secretArn = "arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7", 
        database = "postgres",
        resourceArn = "arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql = updateQuery
    )

    #Return success code if appointment has been deleted
    return{
        statusCode: "200"
    }