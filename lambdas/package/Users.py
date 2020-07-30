from functools import partial
from package import db_config
from package.lambda_exception import LambdaException
import boto3
import botocore

s3 = boto3.resource('s3')

query = partial(
    boto3.client('rds-data').execute_statement,
    database=db_config.DB_NAME,
    secretArn=db_config.SECRET_ARN,
    resourceArn=db_config.ARN
)

# DB CONSTANTS
USERS_TABLE = "users"

# S3 CONSTANTS
IMAGES_BUCKET = 't1-s3-us-east-1-images'

# Currently executeStatement() doesn't support arrayValue.
# So, we pass arrays as strings and then cast them to arrays (ex: :users_ids::int[])
# However, it is expected to be supported in the near future.
# When it becomes available, the code should be updated to use that.

# Methods which are expected to be called multiple times in the same lambda function are designed to use list of identifiers 
# instead of single identifier (user_ids instead of user_id) because that optimizes the program to reduce the number of queries 
# to the backend and saves computation time.

class Users:
    @staticmethod
    def is_student(user_ids):
        """ Returns a dictionary with user ids as key containing boolean values indicating whether the user is a student or not. """

        Users.__check_type(user_ids, list)

        param = [{'name': 'user_ids', 'value': {'stringValue': '{' + ','.join(str(id) for id in user_ids) + '}'}}]
        sql = f"SELECT id, is_student FROM {USERS_TABLE} WHERE id = ANY(:user_ids::int[])"
        sql_result = query(sql=sql, parameters=param)['records']
        result = {}
        for record in sql_result:
            result[record[0]['longValue']] = record[1]['booleanValue']

        return result

    @staticmethod    
    def is_supporter(user_ids):
        """ Returns a dictionary with user ids as key containing boolean values indicating whether the user is a supporter or not. """

        Users.__check_type(user_ids, list)

        param = [{'name': 'user_ids', 'value': {'stringValue': '{' + ','.join(str(id) for id in user_ids) + '}'}}]
        sql = f"SELECT id, is_supporter FROM {USERS_TABLE} WHERE id = ANY(:user_ids::int[])"
        sql_result = query(sql=sql, parameters=param)['records']
        result = {}
        for record in sql_result:
            result[record[0]['longValue']] = record[1]['booleanValue']

        return result

    @staticmethod    
    def is_admin(user_ids):
        """ Returns a dictionary with user ids as key containing boolean values indicating whether the user is an admin or not. """

        Users.__check_type(user_ids, list)

        param = [{'name': 'user_ids', 'value': {'stringValue': '{' + ','.join(str(id) for id in user_ids) + '}'}}]
        sql = f"SELECT id, is_admin FROM {USERS_TABLE} WHERE id = ANY(:user_ids::int[])"
        sql_result = query(sql=sql, parameters=param)['records']
        result = {}
        for record in sql_result:
            result[record[0]['longValue']] = record[1]['booleanValue']

        return result

    @staticmethod
    def get_name(user_ids):
        """ Returns a dictionary with user ids as key containing string values representing the user name (preferred name if exists else first name + last name). """

        Users.__check_type(user_ids, list)

        param = [{'name': 'user_ids', 'value': {'stringValue': '{' + ','.join(str(id) for id in user_ids) + '}'}}]
        sql = f"SELECT id, preferred_name, first_name, last_name FROM {USERS_TABLE} WHERE id = ANY(:user_ids::int[])"
        sql_result = query(sql=sql, parameters=param)['records']
        result = {}
        for record in sql_result:
            if 'stringValue' in record[1]:
                result[record[0]['longValue']] = record[1]['stringValue']
            else:
                result[record[0]['longValue']] = record[2]['stringValue'] + " " + record[3]['stringValue']

        return result
    
    @staticmethod
    def set_first_name(user_id, first_name):
        """ Updates the first name of the user with the specified user id. """
        
        Users.__check_type(user_id, int)
        Users.__check_type(first_name, str)

        param = [
            {'name': 'user_id', 'value': {'stringValue': user_id}},
            {'name': 'first_name', 'value': {'stringValue': first_name}}
        ]
        
        sql = f"UPDATE {USERS_TABLE} SET first_name = :first_name WHERE id = :user_id"
        query(sql=sql, parameters=param, continueAfterTimeout=True)
    
    @staticmethod
    def set_last_name(user_id, last_name):
        """ Updates the last name of the user with the specified user id. """
        
        Users.__check_type(user_id, int)
        Users.__check_type(last_name, str)

        param = [
            {'name': 'user_id', 'value': {'stringValue': user_id}},
            {'name': 'last_name', 'value': {'stringValue': last_name}}
        ]
        
        sql = f"UPDATE {USERS_TABLE} SET last_name = :last_name WHERE id = :user_id"
        query(sql=sql, parameters=param, continueAfterTimeout=True)

    @staticmethod
    def set_preferred_name(user_id, preferred_name):
        """ Updates the preferred name of the user with the specified user id. """
        
        Users.__check_type(user_id, int)
        Users.__check_type(preferred_name, str)

        param = [
            {'name': 'user_id', 'value': {'stringValue': user_id}},
            {'name': 'preferred_name', 'value': {'stringValue': preferred_name}}
        ]
        
        sql = f"UPDATE {USERS_TABLE} SET preferred_name = :preferred_name WHERE id = :user_id"
        query(sql=sql, parameters=param, continueAfterTimeout=True)

    @staticmethod
    def get_email(user_ids):
        """ Returns a dictionary with user ids as key containing string values representing the email address of the users. """

        Users.__check_type(user_ids, list)

        param = [{'name': 'user_ids', 'value': {'stringValue': '{' + ','.join(str(id) for id in user_ids) + '}'}}]
        sql = f"SELECT id, email FROM {USERS_TABLE} WHERE id = ANY(:user_ids::int[])"
        sql_result = query(sql=sql, parameters=param)['records']
        result = {}
        for record in sql_result:
            result[record[0]['longValue']] = record[1]['stringValue']

        return result

    @staticmethod
    def set_email(user_id, email):
        """ Updates the email address of the user with the specified user id. """
        
        Users.__check_type(user_id, int)
        Users.__check_type(email, str)

        param = [
            {'name': 'user_id', 'value': {'stringValue': user_id}},
            {'name': 'email', 'value': {'stringValue': email}}
        ]
        
        sql = f"UPDATE {USERS_TABLE} SET email = :email WHERE id = :user_id"
        query(sql=sql, parameters=param, continueAfterTimeout=True)

    @staticmethod
    def get_profile(user_ids):
        """ Returns a dictionary with user ids as key containing string values representing the presigned url of the profile picture. """

        Users.__check_type(user_ids, list)

        param = [{'name': 'user_ids', 'value': {'stringValue': '{' + ','.join(str(id) for id in user_ids) + '}'}}]
        sql = f"SELECT id, picture FROM {USERS_TABLE} WHERE id = ANY(:user_ids::int[])"
        sql_result = query(sql=sql, parameters=param)['records']
        result = {}
        for record in sql_result:
            if 'stringValue' in record[1]:
                result[record[0]['longValue']] = s3.generate_presigned_url(
                    'get_object',
                    Params={
                        'Bucket': IMAGES_BUCKET,
                        'Key': f"{record[0]['longValue']}/profile/{record[1]['stringValue']}",
                    },
                    ExpiresIn=86400 # Expires in 1 day.
                )
            else:
                result[record[0]['longValue']] = "" # We could replace it with some default picture for a user.

    # No need for allowing multiple user_ids because a user is going to upload their profile picture only.
    @staticmethod
    def get_profile_post_url(user_id, file_name):
        """ Creates a presigned post url to be used by frontend to upload the profile picture. """
        
        Users.__check_type(user_id, int)

        return s3.generate_presigned_post(
            Bucket=IMAGES_BUCKET,
            Key=f"{user_id}/profile/{file_name}",
            Conditions=[
                ['content-length-range', 1, 10485760] # Limit the file size from 1 bytes to 10 MB.
            ],
            ExpiresIn=600 # Expires in 10 minutes
        )

    @staticmethod
    def __check_type(variable, type):
        if type(variable) is not type:
            raise LambdaException(f"InvalidArgumentException: Expected {type}, found {type(variable)}")