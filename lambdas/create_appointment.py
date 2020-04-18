# Written by Maeve Newman
# Updated 4/16/2020

import json
from package.query_db import query
from package.lambda_exception import LambdaException
import time
import datetime

# function puts the appointment details in the database
# Inputs: supporter_id, time_of_appt, type, duration, method, location
# Output: 201 Created
def lambda_handler(event, context):
    # take in lambda input
    student = int(event['student_id'])
    supporter = int(event['supporter_id'])
    time_of_appt = event['time_of_appt']
    appt_type = event['type']
    duration = int(event['duration'])
    method = event['method']
    location = event['location']
    
    # check that student is in DB
    sql = "SELECT student_id FROM students WHERE student_id = :student"
    sql_parameters = [
        {'name' : 'student', 'value': {'longValue': student}}
    ]
    check_student = query(sql, sql_parameters)

    # if student does not exist in DB, return error
    if(check_student['records'] == []):
        return{
            'body': json.dumps("Student not found."),
            'statusCode': 404
        }

    # check that supporter is in DB
    sql = "SELECT supporter_id FROM supporters WHERE supporter_id = :supporter"
    sql_parameters = [
        {'name' : 'supporter', 'value': {'longValue': supporter}}
    ]
    check_supporter = query(sql, sql_parameters)
    
    # if supporter does not exist in DB, return error
    if(check_supporter['records'] == []):
        return{
            'body': json.dumps("Supporter not found."),
            'statusCode': 404
        }
    
    # if supporter is in DB, set id variable for query
    student_id = student
    supporter_id = supporter
    
    # generate and set time_scheduled
    timestamp = time.time() - 240
    time_scheduled = datetime.datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')

    # generate and set appointment_id 
    sql = "SELECT appointment_id FROM scheduled_appointments ORDER BY appointment_id DESC LIMIT 1"
    sql_parameters = []
    id_query = query(sql,sql_parameters)
    appointment_id = id_query['records'][0][0]['longValue'] + 1

    # format query
    SQLquery = """INSERT INTO scheduled_appointments(appointment_id, supporter_id, student_id, time_of_appt, type, duration, location, method, time_scheduled) \
        VALUES (:appointment_id, :supporter_id, :student_id, TO_TIMESTAMP(:time_of_appt, 'YYYY-MM-DD HH24:MI:SS'), :appt_type, :duration, :location, :method, TO_TIMESTAMP(:time_scheduled, 'YYYY-MM-DD HH24:MI:SS'))"""
    
    # format query parameters
    query_parameters = [
        {'name' : 'appointment_id', 'value': {'longValue' : appointment_id}},
        {'name' : 'supporter_id', 'value':{'longValue': supporter_id}},
        {'name' : 'student_id', 'value':{'longValue': student_id}},
        {'name' : 'time_of_appt', 'value':{'stringValue': time_of_appt}},
        {'name' : 'appt_type', 'value':{'stringValue': appt_type}},
        {'name' : 'duration', 'value': {'longValue' : duration}},
        {'name' : 'location', 'value':{'stringValue': location}},
        {'name':'method', 'value':{'stringValue': method}},
        {'name' : 'time_scheduled', 'value': {'stringValue' : time_scheduled}}
    ]

    # make query
    response = query(SQLquery, query_parameters)

    # catch-all error 404
    if(response['numberOfRecordsUpdated'] == 0):
        return {
            'statusCode': 404, 
            'body': json.dumps('Error making appointment.')
        }

    # if no error, return 201 Created
    return {
        'statusCode': 201, 
        'body': json.dumps('Appointment created.')
    }