import json
import boto3


# inputs:
# Email ID, Password

# then request from admin
# restrict access to platform
# once verified recieve email to login

def create_supporter(event, context):

    print('OOF')

    email = event['email']
    password = event['password']

    client = boto3.client('rds-data')  # Connecting to Database

    return {
        'statusCode': 201
    }
