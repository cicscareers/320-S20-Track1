from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    is_admin = event['is_admin']
    is_supporter = event['is_supporter']
    is_student = event['is_student']

    if is_admin == "" and is_supporter == "" and is_student == "":
        get_users_sql = "SELECT id, first_name, last_name, email FROM users;"
        params = []

    else:  
        if is_admin != "":
            is_admin = event['is_admin'].lower()
            if is_admin == "true":
                is_admin = True
            else:
                is_admin = False
        else:
            is_admin = False    

        if is_supporter != "":
            is_supporter = event['is_supporter'].lower()
            if is_supporter == "true":
                is_supporter = True
            else:
                is_supporter = False 
        else:
            is_supporter = False       

        if is_student != "":
            is_student = event['is_student'].lower()
            if is_student == "true":
                is_student = True
            else:
                is_student = False
        else:
            is_student = True 

        is_admin_param = {'name' : 'is_admin', 'value' : {'booleanValue' : is_admin}}
        is_supporter_param = {'name' : 'is_supporter', 'value' : {'booleanValue' : is_supporter}}
        is_student_param = {'name' : 'is_student', 'value' : {'booleanValue' : is_student}}  

        get_users_sql = "SELECT id, first_name, last_name, email FROM users WHERE is_admin = :is_admin AND is_supporter = :is_supporter AND is_student = :is_student;"     
        params = [is_admin_param, is_supporter_param, is_student_param]

    try:
        users = query(get_users_sql, params)['records']
    except Exception as e:
        raise LambdaException("500: Failed to get users, " + str(e))

    response = {
        'users' : []
    }

    for u_id, f_name, l_name, email in users:
        current_users = response['users']
        next_user = {'user_id' : u_id["longValue"], 'first_name' : f_name["stringValue"], 'last_name' : l_name["stringValue"], 'email' : email["stringValue"]}
        current_users.append(next_user)
        response['users'] = current_users

    return response
