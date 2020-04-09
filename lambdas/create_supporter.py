import json
import boto3


# inputs:
# Email ID, Password

# then request from admin
# restrict access to platform
# once verified recieve email to login

def create_supporter(event, context):

    print('OOF')

    email = event['email']
    password = event['hashed_password']

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

    new_user = client.execute_statement(
        secretArn="arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database="postgres",
        resourceArn="arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql="INSERT INTO users(email, hashed_password) VALUES ('%s', '%s')" % (
            email, password)

    )

    # check if Supporter data successfully loaded
    if new_user['numberOfRecordsUpdated'] == 0:
        print("Supporter not created")
        return {
            'statusCode': 404
        }

    # need request to admin about qualifying

    print("Supporter created")
    return {
        'statusCode': 201
    }
