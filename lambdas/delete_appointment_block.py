import json
import boto3
import datetime

from copy import deepcopy
from package import db_config
from package.query_db import query
from package.lambda_exception import LambdaException

# Author: Victoria Caruso

# function deletes an appointment block 
# Input: appointment_block_id, supporter_id
# Output: 200 OK
def lambda_handler(event, context):

    #supporter identifier
    if 'supporter_id' in event:
        supporter_id = int(event['supporter_id'])
    else:
        raise LambdaException("Invalid input: No user Id")

    #Check if supporter exists
    sql = "SELECT supporter_id FROM supporters WHERE supporter_id= :supporter_id"
    supporter_id_param = [{'name' : 'supporter_id', 'value' : {'longValue' : supporter_id}}]
    existing_supporter = query(sql, supporter_id_param)

    if(existing_supporter['records'] == []):
        print("No existing Supporter")
        raise LambdaException("No existing Supporter")

    #appointment block identifier
    if 'appointment_block_id' in event:
        appointment_block_id = int(event['appointment_block_id'])
    else:
        raise LambdaException("Invalid input: No appointment Id")

    #Check if appointment exists
    sql = "SELECT appointment_block_id FROM appointment_block WHERE supporter_id= :supporter_id"
    supporter_id_param = [{'name' : 'supporter_id', 'value' : {'longValue' : supporter_id}}]
    existing_appointment_block = query(sql, supporter_id_param)

    if(existing_appointment_block['records'] == []):
        print("No existing appointment block")
        raise LambdaException("No existing appointment block")

    #delete appt block sql
    sql = """DELETE FROM appointment_block WHERE appointment_block_id= :appnt_blck_id AND supporter_id= :supporter_id"""
    sql_parameters = [{'name' : 'appnt_blck_id', 'value': {'longValue' : appointment_block_id}},
        {'name' : 'supporter_id', 'value' : {'longValue' : supporter_id}}] 

    delete_appmnt_blck = query(sql,sql_parameters)

    # check if delete successfull
    if delete_appmnt_blck['numberOfRecordsUpdated'] == 0:
        return {
            'body': json.dumps("appointment block not deleted"),
            'statusCode': 404
        }

    # success
    return {
        'body': json.dumps("appointment block successfully created"),
        'statusCode': 200
    }