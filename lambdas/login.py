import bcrypt
import query from query_db

def hash_password(email, password):
    sql = "SELECT salt_key FROM users WHERE email = '%s';" % (email)
    salt_key = query(sql)
    return bcrypt.hashpw(password, salt_key)


def verify_password(email, given_password, stored_password):
    hashed_given_password = hash_password(email, given_password)
    return hashed_given_password == stored_password

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

    #Get password from existing user and if does not match return a 400 http
    print("User exists! Acquiring password...")
    sql = "SELECT hashed_password FROM users WHERE email = '%s';" % (given_email)
    existing_password = query(sql)

    print("Checking password...")
    if not verify_password(given_email, given_password, existing_password['records'][0][0]['stringValue']):
        # constants.ERR = "Password DNE"
        # constants.STATUS_CODE = 404
        return

    #Get user type from Database
    print("Password verified. Checking perms...")
    sql = "SELECT type FROM users WHERE email = '%s';" % (given_email)
    user_type = query(sql)

    user_type = user_type['records'][0][0]['longValue']
    if user_type == 1:
        user_type = constants.STUDENT
    elif user_type == 2:
        user_type = constants.SUPPORTER
    else:
        user_type = constants.ADMIN
    token = create_token.rand_token()

    print("Done!")
    db_config.RES = {'token': str(token), 'user':str(user_type)}
    return

def login_handler(event, context):

