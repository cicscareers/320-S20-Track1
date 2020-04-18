import json
from package.query_db import query

#written by Matt Hill
#4/8/20
#Input: first_name, last_name, email, password
#Output: 
def create_student_user(event, context):
    
    first_name = event['first_name']
    last_name = event['last_name']
    email = event['email']
    password = event['hashed_password']

    #Need to check if email is already in DB
    sql = "SELECT email FROM users WHERE email = :email"
    sql_parameters = [{'name' : 'email', 'value': {'stringValue' : email}}]
    check_email = query(sql, sql_parameters)

    if(check_email['records'] != []):
        return{
            'body': json.dumps("email is already being used"),
            'statusCode': 409
        }
    # generates a new id 
    sql = "SELECT id FROM users ORDER BY id DESC LIMIT 1"
    sql_parameters = []
    new_id_query = query(sql,sql_parameters)
    new_id = new_id_query['records'][0][0]['longValue'] + 1

    # adds a user to the "users" table with the new generated id
    sql = """INSERT INTO users(id,first_name,last_name, email, preferred_name, picture, bio,pronouns,gender,phone,is_blocked,GCal_permission,hashed_password,salt_key,user_type) \
        VALUES (:new_id,:first_name,:last_name,:email,'pn','pic','bio','pro','gen','pho',false,true,:password,'salt','student')"""
    sql_parameters = [{'name' : 'new_id', 'value': {'longValue' : new_id}},
    {'name' : 'first_name', 'value': {'stringValue' : first_name}},
    {'name' : 'last_name', 'value': {'stringValue' : last_name}},
    {'name' : 'email', 'value': {'stringValue' : email}},
    {'name' : 'password', 'value': {'stringValue' : password}}]

    create_users_instance = query(sql,sql_parameters)

    # Check to see if the users table was updated
    if(create_users_instance['numberOfRecordsUpdated'] == 0): 
        return {
            'body': json.dumps("User not created"),
            'statusCode': 500
        }
    else:
        # adds a user to the "students" table with the same user id
        sql = """INSERT INTO students(student_id,user_id,spire_id,college,grad_year,resume,job_search,grad_student) \
        VALUES (:new_id,:new_id,1000,'college',4000,'resume',false,false)"""
        sql_parameters = [{'name' : 'new_id', 'value': {'longValue' : new_id}}]
        
        create_students_instance = query(sql,sql_parameters)

        # Check to see if the students table was updated
        if(create_students_instance['numberOfRecordsUpdated'] == 0): 
            return {
                'body': json.dumps("Student not created"),
                'statusCode': 500
        }
        else:
            return{
                'body': json.dumps("Student user created"),
                'statusCode': 201
            }