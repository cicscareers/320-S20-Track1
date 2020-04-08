import json
import boto3
import constants

# this function schedules an appointment for a student by putting the 
# appointment information in the DB
def lambda_handler(event, context):
    
    supporter_id = event['supporter_id']
    time = event['time']
    student_id = event['student_id']
    type_appointment = event['type']
    duration = event['duration']
    location = event['location']

    

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }