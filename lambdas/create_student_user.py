import json
import boto3

#Input: email, password
#Output: 
def create_student_user(event, context):
    
    email = event['student_id']
    password = event['password']
    client = boto3.client('rds-data') #Connecting to the database
    create = client.execute_statement(
        secretArn = "arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database = "postgres",
        resourceArn = "arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql = "INSERT INTO students VALUES ('%s','%s');" % (email,password)
    )

<<<<<<< Updated upstream:lambdas/create_student_user.py
    if create['records'] == '': 
=======
    if(create['numberOfRecordsUpdated'] == 0): 
>>>>>>> Stashed changes:create_student_user.py
        print("Student user not created")
        return {
            "statusCode": 404
        }
    else:
        print("Student user created")
        return{
            'statusCode': 201
        }