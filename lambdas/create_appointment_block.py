import json
import boto3
import datetime

from copy import deepcopy
from package import db_config
from package.query_db import query
from package.lambda_exception import LambdaException

# Author: Victoria Caruso

# function creates an appointment block 
# Input: supporter_id, start_date, end_date, max_num_of_appts, isReccuring
# Output: 201 Created
def lambda_handler(event, context):

    #supporter identifier
    if 'supporter_id' in event:
        supporter_id = int(event['supporter_id'])
    else:
        raise LambdaException("Invalid input: No user Id")

    start_date = event['start_date']
    end_date = event['end_date']
    is_recurring = event['isReccuring'].lower()
    if 'max_num_of_appts' in event:
        max_num_of_appts = int(event['max_num_of_appts'])
    else:
        max_num_of_appts = 1

    if 'recurring_num_weeks' in event:
        recurring_num_weeks = int(event['recurring_num_weeks'])
    else:
        recurring_num_weeks = 13

    #Check if supporter exists
    sql = "SELECT supporter_id FROM supporters WHERE supporter_id= :supporter_id"
    supporter_id_param = [{'name' : 'supporter_id', 'value' : {'longValue' : supporter_id}}]
    existing_supporter = query(sql, supporter_id_param)

    if(existing_supporter['records'] == []):
        print("No existing Supporter")
        raise LambdaException("No existing Supporter")

    # creates appointment_block_id
    sql = "SELECT appointment_block_id FROM appointment_block ORDER BY appointment_block_id DESC LIMIT 1;"
    sql_parameters = []
    appointment_block_id = query(sql, sql_parameters)['records'][0][0]['longValue'] + 1

    #create new appt block sql
    if(is_recurring == "true"):

        reccuring_id = appointment_block_id
        for week in range(recurring_num_weeks):

            sql = """INSERT INTO appointment_block(appointment_block_id, supporter_id, start_date, end_date, max_num_of_appts, recurring_id) 
                VALUES (:appnt_blck_id,:supp_id,:s_date,:e_date,:max_num,:recurr) WHERE NOT EXISTS ( 
                SELECT start_date, end_date FROM appointment_block WHERE supporter_id = :supporter_id)"""
            sql_parameters = [{'name' : 'appnt_blck_id', 'value': {'longValue' : appointment_block_id}},
            {'name' : 'supp_id', 'value': {'longValue' : supporter_id}},
            {'name' : 's_date', 'typeHint' : 'TIMESTAMP', 'value': {'stringValue' : start_date}},
            {'name' : 'e_date', 'typeHint' : 'TIMESTAMP', 'value': {'stringValue' : end_date}},
            {'name' : 'max_num', 'value': {'longValue' : max_num_of_appts}},
            {'name' : 'recurr', 'value': {'longValue' : reccuring_id}}]
            
            create_appmnt_blck = query(sql,sql_parameters)
            
            start_date = datetime.datetime(int(start_date[:4]), int(start_date[5:7]), int(start_date[8:10]), int(start_date[11:13]), int(start_date[14:16]), int(start_date[17:]))
            end_date = datetime.datetime(int(end_date[:4]), int(end_date[5:7]), int(end_date[8:10]), int(end_date[11:13]), int(end_date[14:16]), int(end_date[17:]))
            start_date += datetime.timedelta(days=7)
            end_date += datetime.timedelta(days=7) 
            start_date = start_date.strftime('%Y-%m-%d %H:%M:%S')
            end_date = end_date.strftime('%Y-%m-%d %H:%M:%S')
            appointment_block_id += 1
 
    else:
        sql = """INSERT INTO appointment_block(appointment_block_id, supporter_id, start_date, end_date, max_num_of_appts, recurring_id) 
            VALUES (:appnt_blck_id,:supp_id,:s_date,:e_date,:max_num,NULL) WHERE NOT EXISTS ( 
            SELECT start_date, end_date FROM appointment_block WHERE supporter_id = :supporter_id)"""
        sql_parameters = [{'name' : 'appnt_blck_id', 'value': {'longValue' : appointment_block_id}},
        {'name' : 'supp_id', 'value': {'longValue' : supporter_id}},
        {'name' : 's_date','typeHint' : 'TIMESTAMP','value': {'stringValue' : start_date}},
        {'name' : 'e_date', 'typeHint' : 'TIMESTAMP','value': {'stringValue' : end_date}},
        {'name' : 'max_num', 'value': {'longValue' : max_num_of_appts}}]
        create_appmnt_blck = query(sql,sql_parameters)
        
    # check if supporter types successfully loaded
    if create_appmnt_blck['numberOfRecordsUpdated'] == 0:
        return {
            'body': json.dumps("appointment block not created"),
            'statusCode': 404
        }

    # success
    return {
        'body': json.dumps("appointment block successfully created"),
        'statusCode': 201
    }