import json
from package.query_db import query


# Written by Dat Duong
#Edit by Junshan Zeng

# Input: first_name, last_name, email, hashed_password, employer, title, supporter_types,
# team (optional)
# Output:
def create_supporter(event, context):

    # print('OOF')

    # Users table input
    new_id=int(event['id'])
    # first_name = event['first_name']
    # last_name = event['last_name']
    # email = event['email']
    # password = ""

    # Supporters table input
    employer = event['employer']
    title = event['title']

    # optional
    # if no input for team place empty
    team = event['team']

    # Supporters_type table input
    typ = event['supporter_types']

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

    # # checking if user exists
    # sql = "SELECT email FROM users WHERE email = :email;"

    # sql_parameters = [{'name': 'email', 'value': {'stringValue': email}}]

    # check_user = query(sql, sql_parameters)

    # if check_user['records'] != []:
    #     return {
    #         'body': json.dumps("This email exists already!!!"),
    #         'statusCode': 404
    #     }

    # # creates id
    # sql = "SELECT id FROM users ORDER BY id DESC LIMIT 1;"
    # sql_parameters = []
    # new_id = query(sql, sql_parameters)['records'][0][0]['longValue'] + 1

    # # insert new user into users table
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
    #     return {
    #         'body': json.dumps("User was not created"),
    #         'statusCode': 404
    #     }

    # inserts user into supporters table with same user_id
    sql = """INSERT INTO supporters(supporter_id, user_id, employer, title, feedback, rating, team_name, is_pending, office) \
            VALUES (:new_id, :new_id , :employer, :title, false, 0, :team, true,'office')"""

    sql_parameters = [
        {'name': 'new_id', 'value': {'longValue': new_id}},
        {'name': 'employer', 'value': {'stringValue': employer}},
        {'name': 'title', 'value': {'stringValue': title}},
        {'name': 'team', 'value': {'stringValue': team}}
    ]

    new_supp = query(sql, sql_parameters)

    # check if supporter data successfully loaded
    if new_supp['numberOfRecordsUpdated'] == 0:
        return {
            'body': json.dumps("Supporter was not created"),
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
        return {
            'body': json.dumps("Supporter types not loaded"),
            'statusCode': 404
        }

    # finish
    return {
        'body': "Supporter has been created",
        'statusCode': 201
    }
