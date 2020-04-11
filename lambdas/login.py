from package.lambda_exception import LambdaException
from package.query_db import query
from package import jwt
from datetime import timedelta
import datetime
import dateutil.tz
import json

JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS256'
JWT_EXP_DELTA_SECONDS = 86400
EASTERN_TIME = dateutil.tz.gettz('US/Eastern')

def login(event, context):
    
    print("Attempting to login:")
    print(event)
    if "UserEmail" not in event:
        print("no email")
        raise LambdaException("Invalid input: no email")
    if 'Password' not in event:
        print("no password")
        raise LambdaException("Invalid input: no password")

    given_email = event['UserEmail']
    given_password = event['Password']

    sql = "SELECT email FROM users WHERE email = '%s';" % (given_email)
    existing_user = query(sql)

    print("Checking if user exists...")
    if(existing_user['records'] == []):
        print("User DNE")
        raise LambdaException("Invalid input: Invalid email, user does not exist")

    print("User exists! Fetching name...") 
    sql = "SELECT first_name FROM users WHERE email = '%s';" % (given_email)
    f_name = query(sql)

    sql = "SELECT last_name FROM users WHERE email = '%s';" % (given_email)
    l_name = query(sql)

    #Get password from existing user and if does not match return a 400 http
    print("Acquiring password...")
    sql = "SELECT hashed_password FROM users WHERE email = '%s';" % (given_email)
    existing_password = query(sql)['records'][0][0]['stringValue']

    print("Checking password...")
    if not given_password == existing_password:
        raise LambdaException("Invalid input: Incorrect password")

    #Get user type from Database
    print("Password verified. Checking role...")
    sql = "SELECT id FROM users WHERE email = '%s';" % (given_email)
    user_id = query(sql)     

    role = 'student'

    token_payload = {
        'email' : given_email,
        'role' : role,
        'exp' : datetime.datetime.now(tz=EASTERN_TIME) + timedelta(seconds = JWT_EXP_DELTA_SECONDS)
    }
    token = jwt.encode(token_payload, JWT_SECRET, JWT_ALGORITHM)

    print("Done!")
    response_body = {
        'token': str(token), 
        'email' : str(given_email),
        'f_name': str(f_name),
        'l_name': str(l_name),
        'role': str(role)
        }
    return response_body

def login_handler(event, context):
    try:
        response_body = login(event, context)
        return response_body
    except Exception as e:
        exception_type = e.__class__.__name__
        exception_message = str(e)

        api_exception = {
            "isError" : True,
            "type" : exception_type,
            "message" : exception_message
        }

        json_exception = json.dumps(api_exception)
        raise LambdaException(json_exception)



