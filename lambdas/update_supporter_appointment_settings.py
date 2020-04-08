import json
import boto3
import constants

def update_supporter_appointment_settings(event, context):
    supporter_id = event['supporter_id']
    max_students = event['max_students']
    duration = event['duration']
    major_id = event['major_id']
    specialization_type_id = event['specialization_type_id']
    job_search = event['job_search']
    grad_student = event['grad_student']

    #Connect to table
    client = boto3.client('rds-data')

    #Check if supporter exists
    existing_user = client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "SELECT supporter_id FROM supporters WHERE supporter_id = '%s';" % (supporter_id)
    )
    if(existing_user['records'] == []):
        return{
            'statuscode' : 404
        }

    #Dictionary of things that need to be updated
    # updates = {}
    query = ""

    #Can't be null
    # if(job_search != None):
    #     updates["job_search"] = job_search
    # if(grad_student != None):
    #     updates["grad_student"] = grad_student
    if(job_search == None or grad_student == None): #These values cannot be null
        return{
            'statusCode' : 422 #unproccesable
        }

    #Can be null
    # updates["max_students"] = max_students
    # updates["duration"] = duration
    # updates["major_id"] = major_id
    # updates["specialization_type_id"] = specialization_type_id

    #Put the values into a dictionary to make the query easier to make but there's multiple tables so it's probably not needed

    preferences_table = "UPDATE supporter_preferences_for_student SET job_search = '%s', grad_student = '%s' WHERE supporter_id = '%s';" % (job_search, grad_student, supporter_id)
    specialization_table = "UPDATE supporter_specializations SET max_students = '%s', duration = '%s', specialization_type_id = '%s' WHERE supporter_id = '%s';" % (max_students, duration, specialization_type_id, supporter_id)
    major_preferences_table = "INSERT INTO supporter_major_preferences (supporter_id, major_id) VALUES ('%s', '%s');" % (supporter_id, major_id)

    query = preferences_table + " " + specialization_table + " " + major_preferences_table

    client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = query
    )

    return {
        'statusCode': 200
    }