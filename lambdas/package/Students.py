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
STUDENTS_TABLE = "students"
STUDENT_MAJORS_TABLE = "student_majors"
MAJORS_TABLE = "major"
STUDENT_MINORS_TABLE = "student_minors"

# Currently executeStatement() doesn't support arrayValue.
# So, we pass arrays as strings and then cast them to arrays (ex: :users_ids::int[])
# However, it is expected to be supported in the near future.
# When it becomes available, the code should be updated to use that.

# Methods which are expected to be called multiple times in the same lambda function are designed to use list of identifiers 
# instead of single identifier (user_ids instead of user_id) because that optimizes the program to reduce the number of queries 
# to the backend and saves computation time.

class Students:
    @staticmethod
    def get_grad_yr(student_ids):
        """ Returns a dictionary with student ids as key containing integer values representing the student's graduation year. """

        Students.__check_type(student_ids, list)

        param = [{'name': 'student_ids', 'value': {'stringValue': '{' + ','.join(str(id) for id in student_ids) + '}'}}]
        sql = f"SELECT student_id, grad_year FROM {STUDENTS_TABLE} WHERE student_id = ANY(:student_ids::int[])"
        sql_result = query(sql=sql, parameters=param)['records']
        result = {}
        for record in sql_result:
            if 'longValue' in record[1]:
                result[record[0]['longValue']] = record[1]['booleanValue']
            else:
                result[record[0]['longValue']] = None # Have to figure out what the frontend expects here.

        return result

    @staticmethod
    def set_grad_yr(student_id, grad_yr):
        """ Updates the graduation year of the student with the specified student id. """

        Students.__check_type(student_id, int)
        Students.__check_type(grad_yr, int)

        param = [
            {'name': 'student_id', 'value': {'longValue': student_id}},
            {'name': 'grad_yr', 'value': {'stringValue': grad_yr}}
        ]
        
        sql = f"UPDATE {STUDENTS_TABLE} SET grad_yr = :grad_yr WHERE student_id = :student_id"
        query(sql=sql, parameters=param, continueAfterTimeout=True)

    @staticmethod
    def get_majors(student_ids):
        # TODO: Python docstrings.

        Students.__check_type(student_ids, list)

        param = [{'name': 'student_ids', 'value': {'stringValue': '{' + ','.join(str(id) for id in student_ids) + '}'}}]
        sql = f"SELECT student_id, major, smt.major_id FROM {STUDENT_MAJORS_TABLE} smt, {MAJORS_TABLE} mt WHERE \
            student_id = ANY(:student_ids::int[]) AND smt.major_id = mt.major_id"
        sql_result = query(sql=sql, parameters=param)['records']
        result = dict.fromkeys(student_ids, [])
        for record in sql_result:
            result[record[0]['longValue']].append(
                { # TODO: Make the dictionary key names consistent with those being used currently in lambda functions.
                    'major_name': record[1]['stringValue'],
                    'major_id': record[2]['longValue']
                }
            )

        return result
    
    @staticmethod
    def get_major_id(major_name):
        """ Returns the major id of the major with the specified major name. """

        param = [{'name': 'major_name', 'value': {'stringValue': major_name}}]
        sql = f"SELECT major_id FROM {MAJORS_TABLE} WHERE major = :major_name"
        sql_result = query(sql=sql, parameters=param)['records']
        if sql_result == []:
            return None
        else:
            return sql_result[0][0]['longValue']

    @staticmethod
    def set_majors_by_name(student_id, major_names):
        """ Updates the majors of the student with the specified list of majors. """

        Students.__check_type(major_names, list)

        Students.set_majors_by_id(student_id, [major_id for major_name in major_names if (major_id := Students.get_major_id(major_name)) is not None])

    @staticmethod
    def set_majors_by_id(student_id, major_ids):
        """ Updates majors of the student with the specified list of major ids. """
        
        Students.__check_type(student_id, int)
        Students.__check_type(major_ids, list)
        
        param = [
            {'name': 'student_id', 'value': {'longValue': student_id}},
            {'name': 'majors', 'value': {'stringValue': ",".join([f"({student_id}, {major_id})" for major_id in major_ids])}}
        ]
        sql = f"INSERT INTO {STUDENT_MAJORS_TABLE}(student_id, major_id) VALUES :majors"
        query(sql=sql, parameters=param)

    @staticmethod
    def get_majors_names(student_ids):
        """ Returns a dictionary with student ids as key containing integer values representing the student's graduation year. """

        Students.__check_type(student_ids, list)


    @staticmethod
    def __check_type(variable, type):
        if type(variable) is not type:
            raise LambdaException(f"InvalidArgumentException: Expected {type}, found {type(variable)}")