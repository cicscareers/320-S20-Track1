# Written by Maeve Newman
# 4/08/2020

import constants
import json
import boto3

# function puts the appointment details in the database
# Input: supporter_id, time, student_id, type, duration, location
# Output: 201 Created
def lambda_handler(event, context):
    supporter_id = event['supporter_id']
    time = event['time']
    #student_id = event['student_id']
    appt_type = event['type']
    duration = event['duration']
    location = event['location']

    # connect to db
    client = boto3.client('rds-data')

    query = f"insert into scheduled_appointments 
                (supporter_id, time, type, duration, method, cancelled, cancel_reason, location) 
                values ({supporter_id}, {time}, {appt_type}, {duration}, {"In Person"}, {False}, {None}, {location})"
    
    response = client.execute_statement(
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        secretArn = constants.SECRET_ARN,
        sql = query,
    )

    # output the appointment in json format
    return {
        'statusCode': 201, 
        'body': json.dumps('Appointment created')
    }