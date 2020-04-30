import boto3
import json

from copy import deepcopy
from package import db_config
from package.query_db import query
from package.lambda_exception import LambdaException

#Authors: Victoria Caruso and Hadley Pope
#Date: 4/9/20

#function updates the student profile details in the database
def update_student_profile(event, context):

    total_update = 0

    #student identifier 
    if 'student_id' in event:
        student_id = int(event['student_id'])
    else:
        raise LambdaException("Invalid input: No user Id")

    student_id_param = [{'name' : 'student_id', 'value' : {'longValue' : student_id}}]


    #users table
    updated_user_vals = ""

    if 'first_name' in event:
        first_name = event['first_name']
    else:
        sql = "SELECT first_name FROM users WHERE id= :student_id"
        first_name_data = query(sql, student_id_param)['records'][0][0]
        if 'stringValue' in first_name_data:
            first_name = first_name_data['stringValue']
        else:
            first_name = None
    updated_user_vals += "first_name='%s', " % (first_name)

    if 'last_name' in event:        
        last_name = event['last_name']
    else:
        sql = "SELECT last_name FROM users WHERE id= :student_id"
        last_name_data = query(sql, student_id_param)['records'][0][0]
        if 'stringValue' in last_name_data:
            last_name = last_name_data['stringValue']
        else:
            last_name = None
    updated_user_vals += "last_name='%s', " % (last_name)

    if 'preferred_name' in event:
        preferred_name = event['preferred_name']
    else:
        sql = "SELECT preferred_name FROM users WHERE id= :student_id"
        preferred_name_data = query(sql, student_id_param)['records'][0][0]
        if 'stringValue' in preferred_name_data:
            preferred_name = preferred_name_data['stringValue']
        else:
            preferred_name = None
    updated_user_vals += "preferred_name='%s', " % (preferred_name)

    if 'picture' in event:
        picture = event['picture']
    else:
        sql = "SELECT picture FROM users WHERE id= :student_id"
        picture_data = query(sql, student_id_param)['records'][0][0]
        if 'stringValue' in picture_data:
            picture = picture_data['stringValue']
        else:
            picture = None
    updated_user_vals += "picture='%s', " % (picture)

    if 'bio' in event:
        bio = event['bio']
    else:
        sql = "SELECT bio FROM users WHERE id= :student_id"
        bio_data = query(sql, student_id_param)['records'][0][0]
        if 'stringValue' in bio_data:
            bio = bio_data['stringValue']
        else:
            bio = None
    updated_user_vals += "bio='%s', " % (bio)

    if 'pronouns' in event:
        pronouns = event['pronouns']
    else:
        sql = "SELECT pronouns FROM users WHERE id= :student_id"
        pronouns_data = query(sql, student_id_param)['records'][0][0]
        if 'stringValue' in pronouns_data:
            pronouns = pronouns_data['stringValue']
        else:
            pronouns = None
    updated_user_vals += "pronouns='%s', " % (pronouns)

    if 'phone' in event:
        phone = event['phone']
    else:
        sql = "SELECT phone FROM users WHERE id= :student_id"
        phone_data = query(sql, student_id_param)['records'][0][0]
        if 'stringValue' in phone_data:
            phone = phone_data['stringValue']
        else:
            phone = None
    updated_user_vals += "phone='%s'" % (phone)

    
    #students table
    updated_student_vals = ""

    if 'grad_student' in event:
        grad_student = event['grad_student']
    else:
        sql = "SELECT grad_student FROM students WHERE student_id= :student_id"
        grad_student_data = query(sql, student_id_param)['records'][0][0]
        if 'booleanValue' in grad_student_data:
            grad_student = grad_student_data['booleanValue']
        else:
            grad_student = None
    updated_student_vals += "grad_student='%s', " % (grad_student)

    if 'grad_year' in event:
        grad_year= event['grad_year']
    else:
        sql = "SELECT grad_year FROM students WHERE student_id= :student_id"
        grad_year_data = query(sql, student_id_param)['records'][0][0]
        if 'longValue' in grad_year_data:
            grad_year = grad_year_data['longValue']
        else:
            grad_year = None
    updated_student_vals += "grad_year='%s', " % (grad_year)

    if 'resume' in event: 
        resume = event['resume']
    else:
        sql = "SELECT resume FROM students WHERE student_id= :student_id"
        resume_data = query(sql, student_id_param)['records'][0][0]
        if 'stringValue' in resume_data:
            resume = resume_data['stringValue']
        else:
            resume = None
    updated_student_vals += "resume='%s'" % (resume)


    update_error_messages = []


    #User links
    if 'linkedin' in event:
        linkedin_link = event['linkedin']
        sql = "INSERT INTO user SET user_id = :student_id, link_id = link.link_id, link = :linkedin_link WHERE link.link_type = 'linkedin'"
        linkedin_param = deepcopy(student_id_param)
        linkedin_param.append({'name' : 'linkedin_link', 'value' : {'stringValue' : linkedin_link}})
        try:
            update_linkedin = query(sql, linkedin_param)
        except Exception as e:
            update_error_messages.append("Failed to update linkedin: " + str(e))

    if 'github' in event:
        github_link = event['github']
        sql = "INSERT INTO user SET user_id = :student_id, link_id = link.link_id, link = :github_link WHERE link.link_type = 'github'"
        github_param = deepcopy(student_id_param)
        github_param.append({'name' : 'github_link', 'value' : {'stringValue' : github_link}})
        try:
            update_github = query(sql, github_param)
        except Exception as e:
            update_error_messages.append("Failed to update github: " + str(e))

    if 'personal_site' in event:
        personal_site_link = event['personal_site']
        sql = "INSERT INTO user SET user_id = :student_id, link_id = link.link_id, link = :personal_site_link WHERE link.link_type = 'personal_site'"
        personal_site_param = deepcopy(student_id_param)
        personal_site_param.append({'name' : 'personal_site_link', 'value' : {'stringValue' : personal_site_link}})
        try:
            update_personal_site = query(sql, personal_site_param)
        except Exception as e:
            update_error_messages.append("Failed to update personal site: " + str(e))


    #notification preferences table

    #notifications_queries stores sql queries and their parameters as tuples
    #As of 4/29 only email notifications are supported
    notifications_queries = []


    #student_colleges table

    #college_queries stores sql queries and their parameters as tuples
    college_queries = []

    if 'colleges' in event:
        colleges = event['colleges']

        for college in colleges:
            college_sql = "SELECT college_id FROM college WHERE college= :college"
            college_param = [{'name' : 'college', 'value' : {'stringValue' : college}}]
            try:
                college_id = query(college_sql, college_param)['records'][0][0]['longValue']

                college_id_sql = "INSERT INTO student_college VALUES (:student_id, :college_id)"
                college_id_param = deepcopy(student_id_param)
                college_id_param.append({'name' : 'college_id', 'value' : {'longValue' : college_id}})
                college_queries.append((college_id_sql, college_id_param))

            except Exception as e:
                update_error_messages.append("Failed to retrieve college id for " + college + ": " + str(e))


    #student_majors table
    
    #major_queries stores sql queries and their parameters as tuples
    majors_queries = []

    if 'majors' in event:
        majors = event['majors']

        for major in majors:
            major_sql = "SELECT major_id FROM major WHERE major= :major"
            major_param = [{'name' : 'major', 'value' : {'stringValue' : major}}]
            try:
                major_id = query(major_sql, major_param)['records'][0][0]['longValue']

                major_id_sql = "INSERT INTO student_majors VALUES (:student_id, :major_id)"
                major_id_param = deepcopy(student_id_param)
                major_id_param.append({'name' : 'major_id', 'value' : {'longValue' : major_id}})
                majors_queries.append((major_id_sql, major_id_param))

            except Exception as e:
                update_error_messages.append("Failed to retrieve major id for " + major + ": " + str(e))

    
    #student_minors table
    
    #minor_queries stores sql queries and their parameters as tuples
    minors_queries = []

    if 'minors' in event:
        minors = event['minors']

        for minor in minors:
            minor_sql = "SELECT minor_id FROM minor WHERE minor= :minor"
            minor_param = [{'name' : 'minor', 'value' : {'stringValue' : minor}}]
            try:
                minor_id = query(minor_sql, minor_param)['records'][0][0]['longValue']

                minor_id_sql = "INSERT INTO student_minors VALUES (:student_id, :minor_id)" 
                minor_id_param = deepcopy(student_id_param)
                minor_id_param.append({'name' : 'minor_id', 'value' : {'longValue' : minor_id}})
                minors_queries.append((minor_id_sql, minor_id_param))        

            except Exception as e:
                update_error_messages.append("Failed to retrieve minor id for " + minor + ": " + str(e)) 


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
    if(first_name == None or last_name == None or grad_student == None):
        raise LambdaException("Unprocessable Entity")


    #sql queries to update data in each table
    users_table_sql = (f"UPDATE users SET {updated_user_vals} WHERE id= :student_id")
    try:
        update_user_data = query(users_table_sql, student_id_param)['numberOfRecordsUpdated']
    except Exception as e:
        update_error_messages.append("User table update failed: " + str(e))
                        
    students_table_sql = (f"UPDATE students SET {updated_student_vals} WHERE student_id= :student_id")
    try:
        update_student_data = query(students_table_sql, student_id_param)['numberOfRecordsUpdated']
    except Exception as e:
        update_error_messages.append("Student table update failed: " + str(e))


    #Deleting pre-existing colleges, relevant colleges will be re-added
    delete_colleges_sql = "DELETE FROM student_college WHERE student_id= :student_id"
    try:
        deleted_colleges = query(delete_colleges_sql, student_id_param)
    except Exception as e:
        update_error_messages.append("Deletion of colleges failed: " + str(e))

    #Adding current colleges
    for sql, params in college_queries:
        try:
            updated_colleges = query(sql, params)
        except Exception as e:
            update_error_messages.append("Student college update failed: " + str(e))


    #Deleting pre-existing majors, relevant majors will be re-added
    delete_majors_sql = "DELETE FROM student_majors WHERE student_id= :student_id"
    try:
        deleted_majors = query(delete_majors_sql, student_id_param)
    except Exception as e:
        update_error_messages.append("Deletion of majors failed: " + str(e))

    #Adding current majors
    for sql, params in majors_queries:
        try:
            updated_majors = query(sql, params)
        except Exception as e:
            update_error_messages.append("Student majors update failed: " + str(e))


    #Deleting pre-existing minors, relevant minors will be re-added
    delete_minors_sql = "DELETE FROM student_minors WHERE student_id= :student_id"
    try:
        deleted_minors = query(delete_minors_sql, student_id_param)
    except Exception as e:
        update_error_messages.append("Deletion of minors failed: " + str(e))

    #Adding current minors
    for sql, params in minors_queries:
        try:
            updated_minors = query(sql, params)
        except Exception as e:
            update_error_messages.append("Student minors update failed: " + str(e))


    if(len(update_error_messages) > 0): 
        print("One or more updates failed")
        error_details = "\n".join(update_error_messages)
        raise LambdaException(error_details)

    print("Updated Student Profile")
    return {
        'statusCode': 204 #no content 
    }