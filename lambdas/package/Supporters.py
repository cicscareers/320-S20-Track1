from functools import partial
from package import db_config
from package.lambda_exception import LambdaException
import boto3
import botocore

query = partial(
    boto3.client('rds-data').execute_statement,
    database=db_config.DB_NAME,
    secretArn=db_config.SECRET_ARN,
    resourceArn=db_config.ARN
)

# DB CONSTANTS
SUPPORTERS_TABLE = "supporters"

# Currently executeStatement() doesn't support arrayValue.
# So, we pass arrays as strings and then cast them to arrays (ex: :users_ids::int[])
# However, it is expected to be supported in the near future.
# When it becomes available, the code should be updated to use that.

# Methods which are expected to be called multiple times in the same lambda function are designed to use list of identifiers 
# instead of single identifier (user_ids instead of user_id) because that optimizes the program to reduce the number of queries 
# to the backend and saves computation time.

class Supporters:
    @staticmethod
    def get_employer(supporter_ids):
        """ Returns a dictionary with supporter id as key containing string values representing the employer of the supporter. """

        Supporters.__check_type(supporter_ids, list)

        param = [{'name': 'supporter_ids', 'value': {'stringValue': '{' + ','.join(str(id) for id in supporter_ids) + '}'}}]
        sql = f"SELECT supporter_id, employer FROM {SUPPORTERS_TABLE} WHERE supporter_id = ANY(:supporter_ids::int[])"
        sql_result = query(sql=sql, parameters=param)['records']
        result = dict.fromkeys(supporter_ids, "") # Is every supporter required to have an employer?
        for record in sql_result:
            if 'stringValue' in record[1]:
                result[record[0]['longValue']] = record[1]['stringValue']

        return result
    
    @staticmethod
    def get_title(supporter_ids):
        """ Returns a dictionary with supporter id as key containing string values representing the title of the supporter. """

        Supporters.__check_type(supporter_ids, list)

        param = [{'name': 'supporter_ids', 'value': {'stringValue': '{' + ','.join(str(id) for id in supporter_ids) + '}'}}]
        sql = f"SELECT supporter_id, title FROM {SUPPORTERS_TABLE} WHERE supporter_id = ANY(:supporter_ids::int[])"
        sql_result = query(sql=sql, parameters=param)['records']
        result = dict.fromkeys(supporter_ids, "") # Is every supporter required to have a title?
        for record in sql_result:
            if 'stringValue' in record[1]:
                result[record[0]['longValue']] = record[1]['stringValue']

        return result
    
    @staticmethod
    def get_feedback(supporter_ids):
        # Not sure what feedback does, so no method description here. Could someone else please add that?

        Supporters.__check_type(supporter_ids, list)

        param = [{'name': 'supporter_ids', 'value': {'stringValue': '{' + ','.join(str(id) for id in supporter_ids) + '}'}}]
        sql = f"SELECT supporter_id, feedback FROM {SUPPORTERS_TABLE} WHERE supporter_id = ANY(:supporter_ids::int[])"
        sql_result = query(sql=sql, parameters=param)['records']
        result = dict.fromkeys(supporter_ids, "") # Is every supporter required to have a feedback?
        for record in sql_result:
            if 'booleanValue' in record[1]:
                result[record[0]['longValue']] = record[1]['booleanValue']

        return result

    @staticmethod
    def get_teamname(supporter_ids):
        """ Returns a dictionary with supporter id as key containing string values representing the team name of the supporter. """

        Supporters.__check_type(supporter_ids, list)

        param = [{'name': 'supporter_ids', 'value': {'stringValue': '{' + ','.join(str(id) for id in supporter_ids) + '}'}}]
        sql = f"SELECT supporter_id, team_name FROM {SUPPORTERS_TABLE} WHERE supporter_id = ANY(:supporter_ids::int[])"
        sql_result = query(sql=sql, parameters=param)['records']
        result = dict.fromkeys(supporter_ids, "") # Is every supporter required to have a team name?
        for record in sql_result:
            if 'stringValue' in record[1]:
                result[record[0]['longValue']] = record[1]['stringValue']

        return result

    @staticmethod
    def get_office(supporter_ids):
        # What is office property exactly representing here? Is it office location maybe?
        """ Returns a dictionary with supporter id as key containing string values representing the office of the supporter. """

        Supporters.__check_type(supporter_ids, list)

        param = [{'name': 'supporter_ids', 'value': {'stringValue': '{' + ','.join(str(id) for id in supporter_ids) + '}'}}]
        sql = f"SELECT supporter_id, office FROM {SUPPORTERS_TABLE} WHERE supporter_id = ANY(:supporter_ids::int[])"
        sql_result = query(sql=sql, parameters=param)['records']
        result = dict.fromkeys(supporter_ids, "") # Is every supporter required to have a office?
        for record in sql_result:
            if 'stringValue' in record[1]:
                result[record[0]['longValue']] = record[1]['stringValue']

        return result

    @staticmethod
    def __check_type(variable, type):
        if not isinstance(variable, type):
            raise LambdaException(f"InvalidArgumentException: Expected {type}, found {type(variable)}")