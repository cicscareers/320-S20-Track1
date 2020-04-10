import query from query_db
import datetime

JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS265'
JWT_EXP_DELTA_SECONDS = 86400

def login(http_body):
    
    print("Attempting to login:");
    print(http_body)

    if 'email' not in http_body:
        print("no email")
    if 'pass' not in http_body:
        print("no password")

    given_email = http_body['email']
    given_password = http_body['pass']

    sql = "SELECT email FROM users WHERE email = '%s';" % (given_email)
    existing_user = query(sql)

    print("Checking if user exists...")
    if(existing_user['records'] == []):
        print("User DNE")
        # constants.ERR = "User DNE"
        # constants.STATUS_CODE = 404
        return

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
        # constants.ERR = "Password DNE"
        # constants.STATUS_CODE = 404
        return

    #Get user type from Database
    print("Password verified. Checking role...")
    sql = "SELECT user_id FROM users WHERE email = '%s';" % (given_email)
    
   

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
    return {
        'headers': {
            'Content-Type': 'application/json',
            'X-Content-Type-Options': 'nosniff',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Methods': '*'
        },
    }

