#!/usr/bin/python
import boto3
import constants


def createTempPassword(event, context):
    client = boto3.client('rds-data')
    print(event)
    print('\n\n')
    print(context)
    tempPassword = hash('password')
    print('\n\n')
    print(tempPassword)
    userId = None
    if('userId' not in event):
        return 'No userId'
    else:
        userId = event['userId']
        existing_user = client.execute_statement(
        secretArn = constants.SECRET_ARN,
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "UPDATE users SET password ="+str(tempPassword)+" WHERE id = "+userId+";"
        )

        #sendEmail

        print(existing_user)

def confirmNewPassword(event, context):
    client = boto3.client('rds-data')
    print(event)
    print('\n\n')
    print(context)
    tempPassword = hash(event['password'])
    print('\n\n')
    print(tempPassword)
    userId = None
    if('userId' not in event or 'oldPassword' not in event or 'newPassword' not in event):
        return 'Event does not contain expected values'
    else:
        userId = event['userId']

        query1 = client.execute_statement(
        secretArn = constants.SECRET_ARN,
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "SELECT password FROM users WHERE id = "+userId+";"
        )




        if(query1['password'][0] != hash(event['oldPassword'])):
            return 'Wrong password to update'
        else:
            query2 = client.execute_statement(
            secretArn = constants.SECRET_ARN,
            database = constants.DB_NAME,
            resourceArn = constants.ARN,
            sql = "UPDATE users SET password ="+str(hash(event['newPassword']))+" WHERE id = "+userId+";"
            )
        
        print(query1)

        print(query2)