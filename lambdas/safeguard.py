import boto3
import json

from package import db_config
from package import query_db

#Author: Victoria Caruso
#Date: 4/9/20

#function updates the student profile details in the database
def update_student_profile(event, context):
    #student identifier 
    student_id = event['student_id']

    #users table
    first_name = event['first_name']
    last_name = event['last_name']

    query_str_users = f"SET first_name = '{first_name}', last_name = '{last_name}'"

    if 'preferred_name' in event:
        preferred_name = event['preferred_name']
        query_str_users += f", preferred_name = '{preferred_name}'"
    if 'picture' in event:
        picture = event['picture']
        query_str_users += f", picture = '{picture}'"
    if 'bio' in event:
        bio = event['bio']
        query_str_users += f", bio = '{bio}'"
    if 'pronouns' in event:
        pronouns = event['pronouns']
        query_str_users += f", pronouns = '{pronouns}'"
    if 'phone' in event:
        phone = event['phone']
        query_str_users += f", phone = '{phone}'"
    
    #students table
    grad_student = event['grad_student']
    job_search = event['job_search']

    query_str_students = f"SET job_search = {job_search}, grad_student = {grad_student}"

    if 'college' in event:
        college = event['college']
        query_str_students += f", college = '{college}'"
    if 'grad_year' in event:
        grad_year= event['grad_year']
        query_str_students += f", grad_year = '{grad_year}'"
    if 'resume' in event: 
        resume = event['resume']
        query_str_students += f", resume = '{resume}'"

    #student_majors table
    delete_majors = ""
    student_majors_sql = ""

    if 'majors' in event:
        majors = event['majors']
        delete_majors = (f"DELETE FROM student_majors WHERE student_id = '{student_id}';")
        for major in majors:
            student_majors_sql += (f"INSERT INTO student_majors " \
                f"VALUES ('{student_id}', (SELECT major_id FROM major WHERE major = '{major}');")
    
    #student_minors table
    delete_minors = ""
    student_minors_sql = ""

    if 'minors' in event:
        minors = event['minors']
        delete_minors = (f"DELETE FROM student_minors WHERE student_id = '{student_id}';")
        for minor in minors:
            student_minors_sql += (f"INSERT INTO student_minors " \
                f"VALUES ('{student_id}', (SELECT minor_id FROM minor WHERE minor = '{minor}');")
    
    #Connecting to the database
    client = boto3.client('rds-data') 

    #Check if supporter exists
    existing_user = client.execute_statement(
        secretArn = db_config.SECRET_ARN,
        database = db_config.DB_NAME,
        resourceArn = db_config.ARN,
        sql = f"SELECT student_id FROM students WHERE student_id = '{student_id}';"
    )
    if(existing_user['records'] == []):
        print("No existing Student Record")
        return{
            'statuscode' : 404 #not found
        }

    #values that can not be null
    if(first_name == None or last_name == None or job_search == None or grad_student == None):
        return{
            'statusCode' : 422 #unproccesable entity
        }

    #sql queries to update data in each table
    users_table = (f"UPDATE users {query_str_users}" \
                        f" WHERE id = '{student_id}';")
    students_table = (f"UPDATE students {query_str_students}" \
                        f" WHERE student_id = '{student_id}';")
    
    query = users_table + " " + students_table + " " + delete_majors + " " + student_majors_sql + " " \
            + delete_minors + " " + student_minors_sql

    print(query)
    update_data = client.execute_statement(
        secretArn = db_config.SECRET_ARN, 
        database = db_config.DB_NAME,
        resourceArn = db_config.ARN,
        sql = query
    )

    if(update_data['numberOfRecordsUpdated'] == 0): 
        print("Student data not updated")
        return {
            "statusCode": 400 #bad request
        }
    print("Updated Student Profile")
    return {
        'statusCode': 201 #created 
    }