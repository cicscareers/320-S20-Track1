import boto3
from package.query_db import query
from package.lambda_exception import LambdaException
from package.db_utils import is_user_admin, user_exists, get_user_roles

# Written by Ish Chhabra

# [table, identifier]
userSet = [
    ['users', 'id'],
    ['notification_preferences', 'user_id'],
    ['user_link', 'user_id']
]

studentSet = [
    ['students', 'user_id'],
    ['student_majors', 'student_id'],
    ['student_minors', 'student_id'],
    ['student_college', 'student_id']
]

supporterSet = [
    ['supporters', 'supporter_id'],
    ['supporter_type', 'supporter_id'],
    ['supporter_specializations', 'supporter_id'],
    ['supporter_tags', 'supporter_id'],
    ['supporter_major_preferences', 'supporter_id'],
    ['supporter_minor_preferences', 'supporter_id'],
    ['appointment_block', 'supporter_id']
]

adminSet = [
    ['admins', 'admin_id']
]

# Params:
# {'longValue' : 'admin_id'}
# {'longValue' : 'user_id'}
def delete_user(event, context):
    admin_id = int(event['admin_id'])
    admin_id_param = [{'name' : 'admin_id', 'value' : {'longValue' : admin_id}}]
    
    user_id = int(event['user_id'])
    user_id_param = [{'name' : 'user_id', 'value' : {'longValue' : user_id}}]

    if(not user_exists(user_id)):
        return {
            'body': user_id + ' does not exist',
            'statusCode': 404
        }
    
    if(not user_exists(admin_id_param)):
        return {
            'body': admin_id + ' does not exist',
            'statusCode': 404
        }

    if(not is_user_admin(admin_id_param)):
        return {
            'body': admin_id + ' is not admin',
            'statusCode': 403
        }
    
    # List of tables to remove user from
    tableSet = []
    tableSet.extend(userSet)

    user_roles = get_user_roles(user_id_param)

    if user_roles[0]['booleanValue']:
        tableSet.extend(studentSet)

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
            raise LambdaException(f"Unable to delete user from '{table[0]}' table: {str(e)}")