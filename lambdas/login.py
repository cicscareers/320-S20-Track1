import query from query_db
import datetime
import json

JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS265'
JWT_EXP_DELTA_SECONDS = 86400

def login(http_body):
    
    print("Attempting to login:");
    print(http_body)

    if 'email' not in http_body:
        print("no email")
        raise LambdaException("Invalid input: no email")
    if 'pass' not in http_body:
        print("no password")
        raise LambdaException("Invalid input: no password")

    given_email = http_body['email']
    given_password = http_body['pass']

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
        'exp' : datetime.utcnow() + timedelta(seconds = JWT_EXP_DELTA_SECONDS)
    }
    token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)

    print("Done!")
    response_body = {
        'token': token, 
        'email' : given_email,
        'f_name':,
        'l_name':,
        'role':
        }
    return response_body

def login_handler(event, context):
    http_body = ""
    try:
        response_body = login(http_body)
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

class LambdaException(Exception):
    pass

