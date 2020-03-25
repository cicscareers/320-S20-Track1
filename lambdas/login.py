import boto3
import constants


def login(http_body):
    
    print("Attempting to login:");
    print(http_body)

    if 'email' not in http_body:
        print("no email")
    if 'pass' not in http_body:
        print("no password")

    given_email = http_body['email']
    given_password = http_body['pass']

    client = boto3.client('rds-data')
    print("connecting to database")

    existing_user = client.execute_statement(
        secretArn = constants.SECRET_ARN,
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "SELECT email FROM UserData WHERE email = '%s';" % (given_email)
    )

    print("Checking if user exists...")
    if(existing_user['records'] == []):
        print("User DNE")
        constants.ERR = "User DNE"
        constants.STATUS_CODE = 404
        return

    #Get password from existing user and if does not match return a 400 http
    print("User exists! Acquiring password...")
    existing_password = client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "SELECT pass FROM UserData WHERE email = '%s';" % (given_email)
    )

    print("Checking password...")
    if not auth.verify_password(existing_password['records'][0][0]['stringValue'], given_password):
        constants.ERR = "Password DNE"
        constants.STATUS_CODE = 404
        return

    #Get user type from Database
    print("Password verified. Checking perms...")
    user_type = client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "SELECT type FROM UserData WHERE email = '%s';" % (given_email)
    )

    user_type = user_type['records'][0][0]['longValue']
    if user_type == 1:
        user_type = constants.STUDENT
    elif user_type == 2:
        user_type = constants.SUPPORTER
    else:
        user_type = constants.ADMIN
    token = create_token.rand_token()

    print("Done!")
    constants.RES = {'token': str(token), 'user':str(user_type)}
    return
