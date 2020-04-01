import json

def lambda_handler(event, context):
    # TODO implement
    
    first_name = event['first_name']
    last_name = event['last_name']
    spire_id = event['spire_id']
    gender = event['gender']
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
    
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
