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
        raise LambdaException("422 : Invalid input: No supporter_id")

    if 'delete_recurring' in event:
        delete_recurring = event['delete_recurring'].lower()
    else:
        raise LambdaException("422 : Invalid input: No delete_recurring")

    if 'recurring_id' in event:
        recurring_id = event['delete_recurring']
        if recurring_id != "NULL":
            recurring_id = int(recurring_id)
    else:
        raise LambdaException("422 : Invalid input: No recurring_id")

    #Check if supporter exists
    sql = "SELECT supporter_id FROM supporters WHERE supporter_id= :supporter_id"
    supporter_id_param = [{'name' : 'supporter_id', 'value' : {'longValue' : supporter_id}}]
    existing_supporter = query(sql, supporter_id_param)

    if(existing_supporter['records'] == []):
        raise LambdaException("404 : No existing Supporter")

    #appointment block identifier
    if 'appointment_block_id' in event:
        appointment_block_id = int(event['appointment_block_id'])
    else:
        raise LambdaException("422 : Invalid input: No appointment_block_id")

    #Check if appointment_block_id exists in appointment_block
    sql = "SELECT appointment_block_id FROM appointment_block WHERE supporter_id= :supporter_id"
    supporter_id_param = [{'name' : 'supporter_id', 'value' : {'longValue' : supporter_id}}]
    existing_appointment_block = query(sql, supporter_id_param)

    if(existing_appointment_block['records'] == []):
        raise LambdaException("404 : No existing appointment block")

    #Check if appointment_block_id exists in specializations_for_block
    sql = "SELECT appointment_block_id FROM specializations_for_block WHERE appointment_block_id= :appointment_block_id"
    supporter_id_param = [{'name' : 'appointment_block_id', 'value' : {'longValue' : appointment_block_id}}]
    existing_appointment_block = query(sql, supporter_id_param)

    if(existing_appointment_block['records'] == []):
        print("No existing specializations for appointment block in specializations_for_block")
    else:
        sql = """DELETE FROM specializations_for_block WHERE appointment_block_id= :appnt_blck_id"""
        sql_parameters = [{'name' : 'appnt_blck_id', 'value': {'longValue' : appointment_block_id}}] 
        delete_appmnt_blck = query(sql,sql_parameters)
        
        # check if delete successfull
        if delete_appmnt_blck['numberOfRecordsUpdated'] == 0:
            raise LambdaException("404 : appointment block not deleted from specializations_for_block")

    #delete appt block sql
    if(delete_recurring == "true"):
        sql = """DELETE FROM appointment_block WHERE recurring_id= :recurring_id AND supporter_id= :supporter_id"""
        sql_parameters = [{'name' : 'recurring_id', 'value': {'longValue' : recurring_id}},
            {'name' : 'supporter_id', 'value' : {'longValue' : supporter_id}}] 
        delete_appmnt_blck = query(sql,sql_parameters) 
    else:
        sql = """DELETE FROM appointment_block WHERE appointment_block_id= :appnt_blck_id AND supporter_id= :supporter_id"""
        sql_parameters = [{'name' : 'appnt_blck_id', 'value': {'longValue' : appointment_block_id}},
            {'name' : 'supporter_id', 'value' : {'longValue' : supporter_id}}] 
        delete_appmnt_blck = query(sql,sql_parameters)
    
    # check if delete successfull
    if delete_appmnt_blck['numberOfRecordsUpdated'] == 0:
        raise LambdaException("404 : appointment block not deleted from appointment_block table")

    # success
    return {
        'body': json.dumps("200 : appointment block successfully deleted"),
        'statusCode': 200
    }