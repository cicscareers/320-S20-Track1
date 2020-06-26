import json
from package.query_db import query
from package.dictionary_to_list import dictionary_to_list
from package.lambda_exception import LambdaException
from boto3 import client as boto3_client

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
        response = query(sql_update, sql_parameters)
        sql_insert = """INSERT INTO admins(admin_id, user_id, is_pending) VALUES(:user_id, :user_id, false)
                        """
        response = query(sql_insert, sql_parameters)
        
        # send approval email
        lambda_client = boto3_client('lambda')
        email_event = {
          "user_id": user_id,
          "approved_role": "admin"
        }
        
        try:
            response = lambda_client.invoke(FunctionName="approval_email",
                                               InvocationType='Event',
                                               Payload=json.dumps(email_event))
        except Exception as e:
            raise LambdaException("404: Unable to send approval email " + str(e))
        
    return{
        "statusCode": 200
    }

