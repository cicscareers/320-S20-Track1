import json
import boto3


# Written by Dat Duong

def create_supporter(event, context):

    print('OOF')

    # Users table input
    first_name = event['first_name']
    last_name = event['last_name']
    email = event['email']
    password = event['hashed_password']

    # Supporters table input
    employer = event['employer']
    title = event['title']

    # optional
    team = event['team']

    # if no input for team
    if team == None:
        team = ""

    # Supporters_type table input
    supporter_types = event['supporter_types']

    # initialize supporter types
    professional_staff = False
    student_staff = False
    alumni = False
    faculty = False
    other = False

    # going through input to set supporter types
    for typ in supporter_types:

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

    client = boto3.client('rds-data')  # Connecting to Database

    # checking if user exists
    check_user = client.execute_statement(
        secretArn="arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database="postgres",
        resourceArn="arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql="SELECT email from users where email = '%s';" % email
    )

    if check_user['records'] != []:
        print("This email exists already")
        return {
            'statusCode': 404
        }

    # creates id
    create_id = client.execute_statement(
        secretArn="arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database="postgres",
        resourceArn="arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql="SELECT id FROM users ORDER BY id DESC LIMIT 1;"
    )

    new_id = create_id['records'][0][0]['longValue'] + 1

    # insert new user into users table
    new_user = client.execute_statement(
        secretArn="arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database="postgres",
        resourceArn="arn:aws:rds:us-east-2:500514381816:cluster:postgres",

        # sql="INSERT INTO users(id,first_name,last_name, email, preferred_name, picture, bio, pronouns, gender, phone, is_blocked,GCal_permission, hashed_password, salt_key) \
        # VALUES ((SELECT id FROM users ORDER BY id DESC LIMIT 1)+1,'%s','%s','%s','pn','pic','bio','pro','gen','pho',false,true,'%s','salt')" % (first_name, last_name, email, password)

        sql="INSERT INTO users(id,first_name,last_name, email, preferred_name, picture, bio, pronouns, gender, phone, is_blocked,GCal_permission, hashed_password, salt_key) \
        VALUES ('%s','%s','%s','%s','pn','pic','bio','pro','gen','pho',false, true,'%s','salt')" % (new_id, first_name, last_name, email, password)

    )

    # check if user data successfully loaded
    if new_user['numberOfRecordsUpdated'] == 0:
        print("User was not created")
        return {
            'statusCode': 404
        }

    # inserts user into supporters table with same user_id
    new_supp = client.execute_statement(
        secretArn="arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database="postgres",
        resourceArn="arn:aws:rds:us-east-2:500514381816:cluster:postgres",

        # sql="INSERT INTO supporters(supporter_id, user_id, employer, title, team, feedback, rating, team_name) \
        #     VALUES ((SELECT id FROM users ORDER BY id DESC LIMIT 1),(SELECT id FROM users ORDER BY id DESC LIMIT 1), 'employer', 'title', 'team', false, 0, 'team name')" ,

        sql="INSERT INTO supporters(supporter_id, user_id, employer, title, team, feedback, rating, team_name) \
            VALUES ('%s', '%s' , '%s', '%s', '%s', false, 0, 'team name')" % (new_id, new_id, employer, title, team)

    )

    # check if supporter data successfully loaded
    if new_supp['numberOfRecordsUpdated'] == 0:
        print("Supporter was not created")
        return {
            'statusCode': 404
        }

    # inserts specific supporter types into suppoert types table with same id
    supp_types = client.execute_statement(
        secretArn="arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database="postgres",
        resourceArn="arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql="INSERT INTO supporter_types(supporter_type_id, supporter_id, professional_staff, student_staff, alumni, faculty, other) \
            VALUES ('%s', '%s', '%r', '%r','%r', '%r' , '%r')" % (new_id, new_id, professional_staff, student_staff, alumni, faculty, other)
    )

    # check if supporter types successfully loaded
    if supp_types['numberOfRecordsUpdated'] == 0:
        print("Supporter types not loaded")
        return {
            'statusCode': 404
        }

    # finish
    print("Supporter has been created")
    return {
        'statusCode': 201
    }
