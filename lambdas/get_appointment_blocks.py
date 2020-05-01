import json
import boto3
import datetime

from copy import deepcopy
from package import db_config
from package.query_db import query
from package.lambda_exception import LambdaException

# Author: Victoria Caruso

# function gets all of the appointment blocks for a supporter
# Input: supporter_id
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
    
    #SQL to get all appointments
    sql = """SELECT start_date, end_date, appointment_block_id, recurring_id FROM appointment_block 
        WHERE supporter_id = :supporter_id"""
    sql_parameters = [{'name' : 'supporter_id', 'value': {'longValue' : supporter_id}}]
    appointment_info = query(sql,sql_parameters)
        
    # check if supporter types successfully loaded
    if (appointment_info['records'] == []):
        raise LambdaException("There are no appointment blocks for supporter")
    else:
        appointment_data = []

        #for each entry in the query data, extracts relevant data and stores it in a dictionary with appropriate key
        for entry in appointment_info['records']: 
            block = dict()
            block["start_date"] = entry[0].get("stringValue")
            block["end_date"] = entry[1].get("stringValue")
            block["appointment_block_id"] = entry[2].get("longValue")
            block["recurring_id"] = entry[3].get("longValue")
            appointment_data.append(block)

    #Returns query contents in json format, success
    return {
        'body': json.dumps(appointment_data),
        'statusCode': 200
    }