import json
from package.query_db import query
from package.dictionary_to_list import dictionary_to_list

def verify_admin(event, context):
    user_id = event['user_id']
    user_id_dic = {}
    if user_id == None: #Making sure user_id was passed
        return{
            "statusCode": 404
        }

    user_id_dic['user_id'] = user_id
    sql_parameters = dictionary_to_list(user_id_dic)
    sql_select = """SELECT users.id FROM users WHERE users.id = :user_id""" #This query is ensuring that the user exists
    response = query(sql_select, sql_parameters)
    if response['records'] == []: #Returning error if user does not exist
        print("User does not exist")
        return{
            "statusCode": 404
        }
    sql_select = """SELECT users.id FROM users WHERE users.id = :user_id and is_admin = true""" #This query is ensuring user is not already an admin
    response = query(sql_select, sql_parameters)
    if response['records'] != []: #Returning error if user is already an admin
        print("User is already an admin")
        return{
            "statusCode": 404
        }
    else:
        sql_update = """UPDATE users SET is_admin = true WHERE users.id = :user_id"""
        response = query(sql_update, sql_parameters)
        sql_insert = """INSERT INTO admins(admin_id, user_id, is_pending)\ 
                        VALUES(:user_id, :user_id, false)
                        """
        response = query(sql_insert, sql_parameters)
        return{
            "statusCode": 200
        }

