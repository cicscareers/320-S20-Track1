import json
import boto3

#written by Matt Hill
#4/8/20
#Input: first_name, last_name, email, password
#Output: 
def create_student_user(event, context):
    
    first_name = event['first_name']
    last_name = event['last_name']
    email = event['email']
    password = event['hashed_password']
    client = boto3.client('rds-data') #Connecting to the database

    #Need to check if email is already in DB
    check_email = client.execute_statement(
        secretArn = "arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database = "postgres",
        resourceArn = "arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql = "SELECT email FROM users WHERE email = '%s';" % (email)
    )

    if(check_email['records'] != []):
        return{
            'body': json.dumps("email is already being used"),
            'statusCode': 409
        }
    # generates a new id 
    new_id_query = client.execute_statement(
        secretArn = "arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database = "postgres",
        resourceArn = "arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql = "SELECT id FROM users ORDER BY id DESC LIMIT 1;"
    )
    new_id = new_id_query['records'][0][0]['longValue'] + 1

    # adds a user to the "users" table with the new generated id
    create_users_instance = client.execute_statement(
        secretArn = "arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database = "postgres",
        resourceArn = "arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql = "INSERT INTO users(id,first_name,last_name, email, preferred_name, picture, bio,pronouns,gender,phone,is_blocked,GCal_permission,hashed_password,salt_key) \
        VALUES ('%s','%s','%s','%s','pn','pic','bio','pro','gen','pho',false,true,'%s','salt')" % (new_id,first_name,last_name,email,password)
    )

    if(create_users_instance['numberOfRecordsUpdated'] == 0): 
        return {
            'body': json.dumps("Student user not created"),
            'statusCode': 5
        }
    else:
        # adds a user to the "students" table with the same user id
        create_users_instance = client.execute_statement(
        secretArn = "arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database = "postgres",
        resourceArn = "arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql = "INSERT INTO students(student_id,user_id,spire_id,college,grad_year,resume,job_search,grad_student) \
        VALUES ('%s','%s',1000,'college',4000,'resume',false,false)" % (new_id, new_id)
    )
        
        return{
            'body': json.dumps("Student user created"),
            'statusCode': 201
        }