import json
import boto3


# inputs:
# Email ID, Password


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

    # insert new user into users table
    new_user = client.execute_statement(
        secretArn="arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database="postgres",
        resourceArn="arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql="INSERT INTO users(id,first_name,last_name, email, preferred_name, picture, bio, pronouns, gender, phone, is_blocked,GCal_permission, hashed_password, salt_key) \
        VALUES ((SELECT id FROM users ORDER BY id DESC LIMIT 1)+1,'fn','ln','%s','pn','pic','bio','pro','gen','pho',false,true,'%s','salt')" % (email, password)
    )

    # check if user data successfully loaded
    if new_user['numberOfRecordsUpdated'] == 0:
        print("User was not created")
        return {
            'statusCode': 404
        }

    # inserts user into supporters table with same user_id
    else:
        new_user = client.execute_statement(
            secretArn="arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
            database="postgres",
            resourceArn="arn:aws:rds:us-east-2:500514381816:cluster:postgres",
            sql="INSERT INTO supporters(supporter_id, user_id, employer, title, team, feedback, rating, team_name) \
                VALUES ((SELECT id FROM users ORDER BY id DESC LIMIT 1),(SELECT id FROM users ORDER BY id DESC LIMIT 1), 'employer', 'title', 'team', false, 0, 'team name')"
        )

        # check if supporter data successfully loaded
        if new_user['numberOfRecordsUpdated'] == 0:
            print("Supporter was not created")
            return {
                'statusCode': 404
            }

        print("Supporter created")
        return {
            'statusCode': 201
        }
