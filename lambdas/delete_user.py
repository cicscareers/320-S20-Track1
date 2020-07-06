import boto3
from package.query_db import queryBatch
from package.lambda_exception import LambdaException
from package.dictionary_to_list import dictionary_to_list
from package.db_utils import is_user_admin, user_exists, get_user_roles
from package.s3_utils import delete_image

# Written by Ish Chhabra

# [table, identifier]
userSet = [
    {'table':'users', 'identifier': 'id'},
    {'table': 'notification_preferences', 'identifier': 'user_id'},
    {'table': 'user_link', 'identifier': 'user_id'}
]

studentSet = [
    {'table': 'students', 'identifier': 'user_id'},
    {'table': 'student_majors', 'identifier': 'student_id'},
    {'table': 'student_minors', 'identifier': 'student_id'},
    {'table': 'student_college', 'identifier': 'student_id'}
]

supporterSet = [
    {'table': 'supporters', 'identifier': 'supporter_id'},
    {'table': 'supporter_type', 'identifier': 'supporter_id'},
    {'table': 'supporter_specializations', 'identifier': 'supporter_id'},
    {'table': 'supporter_tags', 'identifier': 'supporter_id'},
    {'table': 'supporter_major_preferences', 'identifier': 'supporter_id'},
    {'table': 'supporter_minor_preferences', 'identifier': 'supporter_id'},
    {'table': 'appointment_block', 'identifier': 'supporter_id'}
]

adminSet = [
    {'table': 'admins', 'idenfitifier': 'admin_id'}
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
    
    # Delete profile picture
    delete_image(f"profile/{user_id}/image")

    # List of tables to remove user from
    parameterSet = []
    parameterSet.extend(userSet)

    user_roles = get_user_roles(user_id_param)

    if user_roles['isStudent']:
        parameterSet.extend(studentSet)

    if user_roles['isSupporter']:
        parameterSet.extend(supporterSet)

    if user_roles['isAdmin']:
        parameterSet.extend(adminSet)

    # Loop through tableSet and delete user_id
    for counter, parameterList in enumerate(parameterSet):
        parameterList['user_id'] = user_id
        parameterSet[counter] = dictionary_to_list(parameterList)

    sql = "DELETE FROM :table WHERE :identifier = :user_id"
    queryBatch(sql, parameterSet)