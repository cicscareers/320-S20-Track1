import boto3
import json

from package import db_config
from package.query_db import query
from package.lambda_exception import LambdaException

#Authors: Victoria Caruso and Hadley Pope
#Date: 4/9/20

#function updates the student profile details in the database
def update_student_profile(event, context):
    #student identifier 
    if student_id in event:
        student_id = event['student_id']
    else:
        raise LambdaException("Invalid input: No user Id")

    student_id_param = [{'name' : 'student_id', 'value' : {'stringValue' : student_id}}]


    #users table
    updated_user_vals = ""

    if first_name in event:
        first_name = event['first_name']
    else:
        sql = "SELECT first_name FROM users WHERE id= :student_id"
        first_name = query(sql, student_id_param)
    updated_user_vals += "first_name='%s', " % (first_name)

    if last_name in event:        
        last_name = event['last_name']
    else:
        sql = "SELECT last_name FROM users WHERE id= :student_id"
        last_name = query(sql, student_id_param)
    updated_user_vals += "last_name='%s', " % (last_name)

    if 'preferred_name' in event:
        preferred_name = event['preferred_name']
    else:
        sql = "SELECT preferred_name FROM users WHERE id= :student_id"
        preferred_name = query(sql, student_id_param)
    updated_user_vals += "preferred_name='%s', " % (preferred_name)

    if 'picture' in event:
        picture = event['picture']
    else:
        sql = "SELECT picture FROM users WHERE id= :student_id"
        picture = query(sql, student_id_param)
    updated_user_vals += "picture='%s', " % (picture)

    if 'bio' in event:
        bio = event['bio']
    else:
        sql = "SELECT bio FROM users WHERE id= :student_id"
        bio = query(sql, student_id_param)
    updated_user_vals += "bio='%s', " % (bio)

    if 'pronouns' in event:
        pronouns = event['pronouns']
    else:
        sql = "SELECT pronouns FROM users WHERE id= :student_id"
        pronouns = query(sql, student_id_param)
    updated_user_vals += "pronouns='%s', " % (pronouns)

    if 'phone' in event:
        phone = event['phone']
    else:
        sql = "SELECT phone FROM users WHERE id= :student_id"
        phone = query(sql, student_id_param)
    updated_user_vals += "phone='%s'" % (phone)

    
    #students table
    updated_student_vals = ""

    if 'grad_student' in event:
        grad_student = event['grad_student']
    else:
        sql = "SELECT grad_student FROM students WHERE id= :student_id"
        grad_student = query(sql, student_id_param)
    updated_student_vals += "grad_student='%s', " % (grad_student)

    if "job_search" in event:
        job_search = event['job_search']
    else:
        sql = "SELECT job_search FROM students WHERE id= :student_id"
    updated_student_vals += "job_search='%s', " % (job_search)

    if 'college' in event:
        college = event['college']
    else:
        sql = "SELECT college FROM students WHERE id= :student_id"
        college = query(sql, student_id_param)
    updated_student_vals += "college='%s', " % (college)

    if 'grad_year' in event:
        grad_year= event['grad_year']
    else:
        sql = "SELECT grad_year FROM students WHERE id= :student_id"
        grad_year = query(sql, student_id_param)
    updated_student_vals += "grad_year='%s', " % (grad_year)

    if 'resume' in event: 
        resume = event['resume']
    else:
        sql = "SELECT resume FROM students WHERE id= :student_id"
        resume = query(sql, student_id_param)
    updated_student_vals += "resume='%s'" % (resume)


    #student_majors table
    delete_majors_sql = ""
    student_majors_sql = ""
    major_params = student_id_param

    if 'majors' in event:
        majors = event['majors']
        delete_majors_sql = "DELETE FROM student_majors WHERE student_id= :student_id"

        for major in majors:
            major_sql = "SELECT major_id FROM major WHERE major= :major"
            param = [{'name' : 'major', 'value' : {'stringValue' : major}}]
            major_id = query(major_sql, param)

            student_majors_sql += "INSERT INTO student_majors VALUES (:student, :major_id)"
            major_id_param = {'name' : 'major_id', 'value' : {'longValue' : major_id}}
            major_params.append(major_id_param)

    
    #student_minors table
    delete_minors_sql = ""
    student_minors_sql = ""
    minor_params = student_id_param

    if 'minors' in event:
        minors = event['minors']
        delete_minors_sql = "DELETE FROM student_minors WHERE student_id= :student_id"

        for minor in minors:
            minor_sql = "SELECT minor_id FROM minor WHERE minor= :minor"
            param = [{'name' : 'minor', 'value' : {'stringValue' : minor}}]
            minor_id = query(minor_sql, param)

            student_minors_sql += "INSERT INTO student_minors VALUES (:student_id, :minor_id)" 
            minor_id_param = {'name' : 'minor_id', 'value' : {'longValue' : minor_id}}
            minor_params.append(minor_id_param)
 

    #Check if student exists
    sql = "SELECT student_id FROM students WHERE student_id= :student_id"
    existing_student = query(sql, student_id_param)

    sql = "SELECT id FROM users WHERE id= :student_id"
    existing_user = query(sql, student_id_param)

    if(existing_student['records'] == []):
        print("No existing Student Record, checking to see if user exists")
        if(existing_user['records'] == []):
            print("User DNE")
            raise LambdaException("User does not exist")
        else:
            sql = "SELECT user_type FROM users WHERE id= :student_id"
            user_type = query(sql, student_id_param)
            error_message = "Not a student, user is a '%s';" % (user_type)
            print(error_message) 
            raise LambdaException(error_message)


    #values that can not be null
    if(first_name == None or last_name == None or job_search == None or grad_student == None):
        raise LambdaException(Unprocessable Entity)


    #sql queries to update data in each table
    users_table_sql = (f"UPDATE users SET {updated_user_vals} WHERE id= :student_id")
                        
    students_table_sql = (f"UPDATE students SET {updated_student_vals} WHERE student_id= :student_id")
    
    sql = users_table_sql + " " + students_table_sql + " " + delete_majors_sql + " " + student_majors_sql + " " \
            + delete_minors_sql + " " + student_minors_sql

    print(query)
    update_data = query(sql, student_id_param)
    )

    if(update_data['numberOfRecordsUpdated'] == 0): 
        print("Student data not updated")
        return {
            "statusCode": 400 #bad request
        }
    print("Updated Student Profile")
    return {
        'statusCode': 204 #no content 
    }