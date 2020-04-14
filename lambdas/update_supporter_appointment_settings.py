#Written by Nhan Le

import json
import boto3
import constants

def update_supporter_appointment_settings(event, context):
    supporter_id = event['id']
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
        sql = "SELECT supporter_id FROM supporters WHERE supporter_id = '%d';" % (supporter_id)
    )
    if(existing_user['records'] == []):
        return{
            'statuscode' : 404
        }

    query = ""

    #Can't be null
    if(job_search == None or grad_student == None): #These values cannot be null
        return{
            'statusCode' : 422 #unproccesable
        }

    preferences_table = "UPDATE supporter_preferences_for_students SET job_search = '%s', grad_student = '%s' WHERE supporter_id = '%d';" % (job_search, grad_student, supporter_id)
    specialization_table = "UPDATE supporter_specializations SET max_students = '%d', duration = '%d', specialization_type_id = '%d' WHERE supporter_id = '%d';" % (max_students, duration, specialization_type_id, supporter_id)
    major_preferences_table = "INSERT INTO supporter_major_preferences (supporter_id, major_id) VALUES ('%d', '%d');" % (supporter_id, major_id)

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