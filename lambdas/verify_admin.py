import json
from package.query_db import query
from package.dictionary_to_list import dictionary_to_list
from package.lambda_exception import LambdaException

#author: Sanjay Rajasekaran
def verify_admin(event, context):
    user_id = int(event['user_id'])
    user_id_dic = {}
    if user_id == None: #Making sure user_id was passed
       raise LambdaException("400: user_id was not given")

    user_id_dic['user_id'] = user_id
    sql_parameters = dictionary_to_list(user_id_dic)
    sql_select = """SELECT users.id FROM users WHERE users.id = :user_id""" #This query is ensuring that the user exists
    response = query(sql_select, sql_parameters)
    if response['records'] == []: #Returning error if user does not exist
       raise LambdaException("404: user does not exist")

    sql_select = """SELECT users.id FROM users WHERE users.id = :user_id and is_admin = true""" #This query is ensuring user is not already an admin
    response = query(sql_select, sql_parameters)
    if response['records'] != []: #Returning error if user is already an admin
        raise LambdaException("405: user is already an admin")
    else:
        sql_update = """UPDATE users SET is_admin = true WHERE users.id = :user_id"""
        response = query(sql_update, sql_parameters) #updating is_admin to true on users table
        sql_insert = """INSERT INTO admins(admin_id, user_id, is_pending) VALUES(:user_id, :user_id, false)
                        """
        response = query(sql_insert, sql_parameters) #adding new admin to admin table
        return{
            "statusCode": 200
        }

