import json
import boto3

def lambda_handler(event, context):
    
    first_name = event['first_name']
    last_name = event['last_name']
    prefered_name = event['prefered_name']
    picture = event['picture']
    bio = event['bio']
    pronouns = event['pronouns']
    phone = event['phone']
    college = event['college']
    grad_year= event['grad_year']
    majors = event['majors']
    minors = event['minors']
    resume = event['resume']
    job_search = event['job_search']
    grad_student = event['grad_student']

    client = boto3.client('rds-data') #Connecting to the database
    appointment_info = client.execute_statement(
        secretArn = constants.SECRET_ARN,
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "INSERT INTO" #query that updates supporter profile settings
    )
    
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
