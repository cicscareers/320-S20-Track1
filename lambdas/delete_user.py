import boto3
from package.query_db import query
from package.lambda_exception import LambdaException

# Written by Ish Chhabra

# {table, identifier}
userSet = [
    {'users', 'id'},
    {'students', 'user_id'},
    {'student_majors', 'student_id'},
    {'student_minors', 'student_id'},
    {'user_link', 'user_id'},
    {'student_college', 'student_id'}
]

supporterSet = [
    {'supporters', 'supporter_id'},
    {'supporter_type', 'supporter_id'},
    {'supporter_specializations', 'supporter_id'},
    {'user_link', 'user_id'},
    {'supporter_tags', 'supporter_id'},
    {'supporter_major_preferences', 'supporter_id'},
    {'supporter_minor_preferences', 'supporter_id'},
]

adminSet = [
    {'admins', 'admin_id'}
]

# Params:
# {'longValue' : 'admin_id'}
# {'longValue' : 'user_id'}
def delete_user(event, context):
    admin_id = int(event['admin_id'])

    if(not is_user_admin(admin_id)):
        return {
            'body': admin_id + ' is not admin',
            'statusCode': 403
        }
    
    user_id = int(event['user_id'])
    user_id_param = [{'name' : 'user_id', 'value' : {'longValue' : user_id}}]

    # List of tables to remove user from
    tableSet = []


    sql = "SELECT is_student, is_supporter, is_admin FROM users WHERE id = :user_id"
    try:
        user_roles = query(sql, user_id_param)['records'][0]
    except Exception as e:
        raise LambdaException("Unable to retrieve roles: " + str(e))

    if user_roles[0]['booleanValue']:
        tableSet.extend(userSet)
    else:
        return {
            'body': user_id + ' does not exist',
            'statusCode': 404
        }

    if user_roles[1]['booleanValue']:
        tableSet.extend(supporterSet)

    if user_roles[2]['booleanValue']:
        tableSet.extend(adminSet)

    # Loop through tableSet and delete user_id
    for table in tableSet:
        sql = f"DELETE FROM {table[0]} WHERE {table[1]} = :user_id"
        try:
            query(sql, user_id_param)['records'][0]
        except Exception as e:
            raise LambdaException(f"Unable to delete user from '{table[0]}' table: " + str(e))

def is_user_admin(admin_id):
    sql = "SELECT is_admin FROM users WHERE id = :admin_id"
    sql_param = [{'name' : 'admin_id', 'value' : {'longValue' : admin_id}}]
    try:
        return query(sql, sql_param)['records'][0][0]['booleanValue']
    except Exception as e:
        raise LambdaException("Unable to verify admin: " + str(e))