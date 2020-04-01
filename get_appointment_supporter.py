import json
import boto3

#Input: supporter_id
#Output: JSON object of current supporter appointments
def get_appointment_supporters(event, context):
    # TODO implement

    supporter_id = event['supporter_id']
    




    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }