from package.query_db import query
from package.lambda_exception import LambdaException

def get_user_roles_handler(event, context):

    user_id = int(event[user_id])
    user_id_param = [{'name' : 'user_id', 'value' : {'longValue' : user_id}}]

    sql = "SELECT is_admin, is_supporter, is_student FROM users WHERE id = :user_id"

    try:
        result = query(sql, user_id_param)['records'][0]
    except Exception as e:
        raise LambdaException("Unable to retrieve roles: " + str(e))

    user_roles = []
    if result[0]['booleanValue']:
        user_roles.append('admin')
    if result[1]['booleanValue']:
        user_roles.append('supporter')
    if result[2]['booleanValue']:
        user_roles.append('student')

    return {
        'statusCode' : 200,
        'user_roles' : user_roles
    }