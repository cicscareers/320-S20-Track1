import boto3
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
        first_name = query(sql, student_id_param)['records'][0][0]['stringValue']
    updated_user_vals += "first_name='%s', " % (first_name)

    if 'last_name' in event:        
        last_name = event['last_name']
    else:
        sql = "SELECT last_name FROM users WHERE id= :student_id"
        last_name = query(sql, student_id_param)['records'][0][0]['stringValue']
    updated_user_vals += "last_name='%s', " % (last_name)

    if 'preferred_name' in event:
        preferred_name = event['preferred_name']
    else:
        sql = "SELECT preferred_name FROM users WHERE id= :student_id"
        preferred_name = query(sql, student_id_param)['records'][0][0]['stringValue']
    updated_user_vals += "preferred_name='%s', " % (preferred_name)

    if 'picture' in event:
        picture = event['picture']
    else:
        sql = "SELECT picture FROM users WHERE id= :student_id"
        picture = query(sql, student_id_param)['records'][0][0]['stringValue']
    updated_user_vals += "picture='%s', " % (picture)

    if 'bio' in event:
        bio = event['bio']
    else:
        sql = "SELECT bio FROM users WHERE id= :student_id"
        bio = query(sql, student_id_param)['records'][0][0]['stringValue']
    updated_user_vals += "bio='%s', " % (bio)

    if 'pronouns' in event:
        pronouns = event['pronouns']
    else:
        sql = "SELECT pronouns FROM users WHERE id= :student_id"
        pronouns = query(sql, student_id_param)['records'][0][0]['stringValue']
    updated_user_vals += "pronouns='%s', " % (pronouns)

    if 'phone' in event:
        phone = event['phone']
    else:
        sql = "SELECT phone FROM users WHERE id= :student_id"
        phone = query(sql, student_id_param)['records'][0][0]['stringValue']
    updated_user_vals += "phone='%s'" % (phone)

    
    #students table
    updated_student_vals = ""

    if 'grad_student' in event:
        grad_student = event['grad_student']
    else:
        sql = "SELECT grad_student FROM students WHERE student_id= :student_id"
        grad_student = query(sql, student_id_param)['records'][0][0]['booleanValue']
    updated_student_vals += "grad_student='%s', " % (grad_student)

    if "job_search" in event:
        job_search = event['job_search']
    else:
        sql = "SELECT job_search FROM students WHERE student_id= :student_id"
        job_search = query(sql, student_id_param)['records'][0][0]['booleanValue']
    updated_student_vals += "job_search='%s', " % (job_search)

    if 'college' in event:
        college = event['college']
    else:
        sql = "SELECT college FROM students WHERE student_id= :student_id"
        college = query(sql, student_id_param)['records'][0][0]['stringValue']
    updated_student_vals += "college='%s', " % (college)

    if 'grad_year' in event:
        grad_year= event['grad_year']
    else:
        sql = "SELECT grad_year FROM students WHERE student_id= :student_id"
        grad_year = query(sql, student_id_param)['records'][0][0]['longValue']
    updated_student_vals += "grad_year='%s', " % (grad_year)

    if 'resume' in event: 
        resume = event['resume']
    else:
        sql = "SELECT resume FROM students WHERE student_id= :student_id"
        resume = query(sql, student_id_param)['records'][0][0]['stringValue']
    updated_student_vals += "resume='%s'" % (resume)


    #student_majors table
    
    #major_queries stores sql queries and their parameters as tuples
    majors_queries = []

    if 'majors' in event:
        majors = event['majors']

        for major in majors:
            major_sql = "SELECT major_id FROM major WHERE major= :major"
            major_param = [{'name' : 'major', 'value' : {'stringValue' : major}}]
            major_id = query(major_sql, major_param)['records'][0][0]['longValue']

            major_id_sql = "INSERT INTO student_majors VALUES (:student_id, :major_id)"
            major_id_param = deepcopy(student_id_param)
            major_id_param.append({'name' : 'major_id', 'value' : {'longValue' : major_id}})
            majors_queries.append((major_id_sql, major_id_param))

    
    #student_minors table
    
    #minor_queries stores sql queries and their parameters as tuples
    minors_queries = []

    if 'minors' in event:
        minors = event['minors']

        for minor in minors:
            minor_sql = "SELECT minor_id FROM minor WHERE minor= :minor"
            minor_param = [{'name' : 'minor', 'value' : {'stringValue' : minor}}]
            minor_id = query(minor_sql, minor_param)['records'][0][0]['longValue']

            minor_id_sql = "INSERT INTO student_minors VALUES (:student_id, :minor_id)" 
            minor_id_param = deepcopy(student_id_param)
            minor_id_param.append({'name' : 'minor_id', 'value' : {'longValue' : minor_id}})
            minors_queries.append((minor_id_sql, minor_id_param))         


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
        raise LambdaException("Unprocessable Entity")


    update_error_messages = []

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
        'body' : "Successfully updated student profile"
    }

def upload_profile_picture(student_id, picData):
    s_3 = boto3.client('s3')

    bucket_name_images = 't1-s3-us-east-1-images' # s3 bucket for images

    file_path = 'profile/' + str(student_id) + 'image'

    try:
        s_3.put_object(Bucket=bucket_name_images, Key=file_path, Body=picData)
    except Exception as e:
        raise LambdaException("400: Failed to upload file. " + str(e))
