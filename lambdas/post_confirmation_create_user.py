import json
import boto3
client = boto3.client('cognito-idp')
from package.query_db import query

#Edit by Junshan Zeng

def create_student_user(event, context):
    # print(event["request"]["userAttributes"])
    

#     ret = client.admin_get_user(
#     UserPoolId='us-east-2_TOeWJwIy0',
#     Username=event["request"]["userAttributes"]["email"]
# )
#     print(ret)

    
    first_name = event["request"]["userAttributes"]['given_name']
    last_name = event["request"]["userAttributes"]['family_name']
    email = event["request"]["userAttributes"]['email']
    #password = ""
    is_supporter= True if event["request"]["userAttributes"]["profile"]=="Supporter" else False

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
    if((new_id_query['records']) == []):
        new_id = 1
    else:
        new_id = new_id_query['records'][0][0]['longValue'] + 1
    
    # updating the preffered username with new_id
    update_response=client.admin_update_user_attributes(
        UserPoolId='us-east-2_TOeWJwIy0',
        Username=event["request"]["userAttributes"]["email"],
            UserAttributes=[
                    {
                "Name": "preferred_username",
                "Value": str(new_id)
              },
            ]
        )
    #checks the update
    # ret = client.admin_get_user(
    # UserPoolId='us-east-2_TOeWJwIy0',
    # Username=event["request"]["userAttributes"]["email"]
    # )
    # print(ret)  
    #sets the is_student boolean to TRUE

    # adds a user to the "users" table with the new generated id
    sql = """INSERT INTO users(id,first_name,last_name, email, preferred_name, picture, bio,pronouns,gender,phone,is_blocked,GCal_permission,is_admin,is_supporter,is_student) \
        VALUES (:new_id,:first_name,:last_name,:email,'pn','pic','bio','pro','gen','pho',false,true,false, :is_supporter, true)""" #(last three fields) is_admin, is_supporter, is_student
    sql_parameters = [{'name' : 'new_id', 'value': {'longValue' : new_id}},
    {'name' : 'first_name', 'value': {'stringValue' : first_name}},
    {'name' : 'last_name', 'value': {'stringValue' : last_name}},
    {'name' : 'email', 'value': {'stringValue' : email}},
    #{'name' : 'password', 'value': {'stringValue' : password}},
    {'name': 'is_supporter', 'value':{'booleanValue': is_supporter}}] #changes is_supporter to true if it is supporter


    create_users_instance = query(sql,sql_parameters)

    # Check to see if the users table was updated
    if(create_users_instance['numberOfRecordsUpdated'] == 0): 
        return {
            'body': json.dumps("User not created"),
            'statusCode': 500
        }

    # adds a user to the "students" table with the same user id
    sql = """INSERT INTO students(student_id,user_id,grad_year,resume,grad_student) \
    VALUES (:new_id,:new_id,4000,'resume',false)"""
    sql_parameters = [{'name' : 'new_id', 'value': {'longValue' : new_id}}]
    
    create_students_instance = query(sql,sql_parameters)

    # Check to see if the students table was updated
    if(create_students_instance['numberOfRecordsUpdated'] == 0): 
        return {
            'body': json.dumps("Student not created"),
            'statusCode': 500
    }

######################################################################################################################################
    #checks if the role of the user is supporter and then creates supporter with is_pending=True
    if event["request"]["userAttributes"]["profile"]=="Supporter":
        # Users table input/ these user inputs already exists above
        # first_name = event['first_name']
        # last_name = event['last_name']
        # email = event['email']
        # password = event['hashed_password']

        # Supporters table input
        employer = event["request"]["userAttributes"]['zoneinfo'] #zoneinfo=employer in cognito
        title = event["request"]["userAttributes"]["nickname"] #nickname=title in cognito

        # optional
        # if no input for team place empty
        # if 'team' not in event:
        #     team = 'team'

        # else:
        team = event["request"]["userAttributes"]["address"] #address=team in cognito

        # Supporters_type table input
        typ = event["request"]["userAttributes"]["locale"] #locale=support_types in cognito

        # initialize supporter types
        professional_staff = False
        student_staff = False
        alumni = False
        faculty = False
        other = False

        # going through input to set supporter types
        # for typ in supporter_types:

        if typ == 'professional_staff':
            professional_staff = True
        if typ == 'student_staff':
            student_staff = True
        if typ == 'alumni':
            alumni = True
        if typ == 'faculty':
            faculty = True
        if typ == 'other':
            other = True

        # checking if user exists
        sql = "SELECT email from users where email = :email;"

        sql_parameters = [{'name': 'email', 'value': {'stringValue': email}}]

        check_user = query(sql, sql_parameters)

        #already checked valid email above
        # if check_user['records'] != []:
        #     print("This email exists already")
        #     return {
        #         'statusCode': 404
        #     }

        #DOES NOT NEED NEW ID BECAUSE IT SHOULD BE THE SAME AS THE PREVIOUS ONE
        # creates id
        # sql = "SELECT id FROM users ORDER BY id DESC LIMIT 1;"
        # new_id = query(sql)['records'][0][0]['longValue'] + 1
 
        #NEW USER HAS ALREADY BEEN CREATED ABOVE
        # insert new user into users table
        # sql = """INSERT INTO users(id,first_name,last_name, email, preferred_name, picture, bio, pronouns, gender, phone, is_blocked,GCal_permission, hashed_password, salt_key, user_type) \
        # VALUES (:new_id, :first_name, :last_name, :email,'pn','pic','bio','pro','gen','pho',false, true, :password,'salt', 'supporter')"""

        # sql_parameters = [
        #     {'name': 'new_id', 'value': {'longValue': new_id}},
        #     {'name': 'first_name', 'value': {'stringValue': first_name}},
        #     {'name': 'last_name', 'value': {'stringValue': last_name}},
        #     {'name': 'email', 'value': {'stringValue': email}},
        #     {'name': 'password', 'value': {'stringValue': password}}
        # ]

        # new_user = query(sql, sql_parameters)

        # # check if user data successfully loaded
        # if new_user['numberOfRecordsUpdated'] == 0:
        #     print("User was not created")
        #     return {
        #         'statusCode': 404
        #     }

        # inserts user into supporters table with same user_id
        sql = """INSERT INTO supporters(supporter_id, user_id, employer, title, feedback, rating, team_name, is_pending, office) \
                VALUES (:new_id, :new_id , :employer, :title, false, 0, :team, false,'office')""" 

        sql_parameters = [
            {'name': 'new_id', 'value': {'longValue': new_id}},
            {'name': 'employer', 'value': {'stringValue': employer}},
            {'name': 'title', 'value': {'stringValue': title}},
            {'name': 'team', 'value': {'stringValue': team}}
        ]

        new_supp = query(sql, sql_parameters)

########################################################################
        # check if supporter data successfully loaded
        if new_supp['numberOfRecordsUpdated'] == 0:
            # print("Supporter was not created")
            return {
                'statusCode': 404
            }

        # inserts specific supporter types into suppoert types table with same id
        sql = """INSERT INTO supporter_type(supporter_id, professional_staff, student_staff, alumni, faculty, other) \
                VALUES (:new_id, :professional_staff, :student_staff, :alumni, :faculty , :other)"""

        sql_parameters = [
            {'name': 'new_id', 'value': {'longValue': new_id}},
            {'name': 'professional_staff', 'value': {
                'booleanValue': professional_staff}},
            {'name': 'student_staff', 'value': {'booleanValue': student_staff}},
            {'name': 'alumni', 'value': {'booleanValue': alumni}},
            {'name': 'faculty', 'value': {'booleanValue': faculty}},
            {'name': 'other', 'value': {'booleanValue': other}}
        ]

        supp_types = query(sql, sql_parameters)

        # check if supporter types successfully loaded
        if supp_types['numberOfRecordsUpdated'] == 0:
            # print("Supporter types not loaded")
            return {
                'statusCode': 404
            }

        # finish
        # print("the student has been created")
        # print("YAY!!!")
    return event