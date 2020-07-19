import boto3
from package.query_db import query, beginTransaction, commitTransaction
from package.lambda_exception import LambdaException
from package.dictionary_to_list import dictionary_to_list
from package.db_utils import is_user_admin, user_exists, get_user_roles, get_user_email
from package.s3_utils import delete_image
from package.cognito_utils import delete_user as cognito_delete_user

# Written by Ish Chhabra

# [table, identifier]
userSet = [
    ['notification_preferences', 'user_id'],
    ['user_link', 'user_id'],
    ['users', 'id']
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
    ['supporter_preferences_for_students', 'supporter_id'],
    ['supporter_mediums', 'supporter_id'],
    ['scheduled_appointments', 'supporter_id'],
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
    user_id = int(event['user_id'])
    
    if(not user_exists(user_id)):
        return {
            'body': str(user_id) + ' does not exist',
            'statusCode': 404
        }
    
    if(not user_exists(admin_id)):
        return {
            'body': str(admin_id) + ' does not exist',
            'statusCode': 404
        }

    if(not is_user_admin(admin_id)):
        return {
            'body': str(admin_id) + ' is not admin',
            'statusCode': 403
        }
    
    # Delete user from cognito
    cognito_delete_user(get_user_email(user_id))

    # Delete profile picture
    delete_image(f"profile/{user_id}/image")

    # List of tables to remove user from
    tableSet = []

    user_roles = get_user_roles(user_id)

    if user_roles['isStudent']:
        tableSet.extend(studentSet)

    if user_roles['isSupporter']:
        tableSet.extend(supporterSet)

    if user_roles['isAdmin']:
        tableSet.extend(adminSet)
    
    tableSet.extend(userSet)

    # Loop through tableSet and delete user_id
    tranasactionID = beginTransaction()['transactionId']
    user_id_param = [{'name' : 'user_id', 'value' : {'longValue' : user_id}}]
    for table in tableSet:
        sql = f"DELETE FROM {table[0]} WHERE {table[1]} = :user_id"
        query(sql, user_id_param, tranasactionID)
    commitTransaction(tranasactionID)