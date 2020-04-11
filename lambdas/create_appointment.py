# Written by Maeve Newman
# 4/08/2020

import constants
import json
import boto3

# function puts the appointment details in the database
# Input: supporter_id, time, type, duration, location
# Output: 201 Created
def lambda_handler(event, context):
    supporter_id = event['supporter_id']
    time = event['time_of_appt']
    appt_type = event['type']
    duration = event['duration']
    location = event['location']

    # connect to db
    client = boto3.client('rds-data')

    query = f"INSERT INTO scheduled_appointments(supporter_id, time, type, duration, cancelled, cancel_reason, location) \
        VALUES ({supporter_id}, {time}, {appt_type}, {duration}, {False}, {None}, {location})"
    
    response = client.execute_statement(
        database = "postgres",
        resourceArn = "arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        secretArn = "arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        sql = query,
    )

    # if error, return 404
    if(response['numberOfRecordsUpdated'] == 0){
        return {
            'statusCode': 404, 
            'body': json.dumps('Error making appointment')
        }
    }

    # if no error, return 201 Created
    return {
        'statusCode': 201, 
        'body': json.dumps('Appointment created')
    }