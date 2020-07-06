import boto3

UserPoolID='us-east-2_TOeWJwIy0'

def delete_user(email):
    client = boto3.client('cognito-idp')
    client.admin_delete_user(UserPoolId=UserPoolID, Username=email)