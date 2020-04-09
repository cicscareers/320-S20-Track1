import json
import boto3

#written by Matt Hill
#4/8/20
#Input: email, password
#Output: 
def create_student_user(event, context):
    
    email = "test2email" #event['student_id']
    password = "test2pass" #event['hashed_password']
    client = boto3.client('rds-data') #Connecting to the database

    #Need to check if email is already in DB
    check_email = client.execute_statement(
        secretArn = "arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database = "postgres",
        resourceArn = "arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql = "SELECT email FROM users WHERE email = '%s';" % (email)
    )

    if(check_email['records'] != []):
        print("email is already being used")
        return{
            'statusCode': 404 
        }
    # adds a user to the "users" table
    create_users_instance = client.execute_statement(
        secretArn = "arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database = "postgres",
        resourceArn = "arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql = "INSERT INTO users(id,first_name,last_name, email, preferred_name, picture, bio,pronouns,gender,phone,is_blocked,GCal_permission,hashed_password,salt_key) \
        VALUES ((SELECT id FROM users ORDER BY id DESC LIMIT 1)+1,'fn','ln','%s','pn','pic','bio','pro','gen','pho',false,true,'%s','salt')" % (email,password)
    )

    if(create_users_instance['numberOfRecordsUpdated'] == 0): 
        print("Student user not created")
        return {
            "statusCode": 404
        }
    else:
        # adds a user to the "students" table with the same user id
        create_users_instance = client.execute_statement(
        secretArn = "arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database = "postgres",
        resourceArn = "arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql = "INSERT INTO students(student_id,user_id,spire_id,college,grad_year,resume,job_search,grad_student) \
        VALUES ((SELECT id FROM users ORDER BY id DESC LIMIT 1),(SELECT id FROM users ORDER BY id DESC LIMIT 1),1000,'college',3000,'resume',false,false)"
    )
        print("Student user created")
        return{
            'statusCode': 201
        }