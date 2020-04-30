# Written by Maeve Newman
# Updated 4/22/2020

import json
from package.query_db import query
from package.lambda_exception import LambdaException
import time
import datetime
from package.email_ics import send_cal_email

# function puts the appointment details in the database
# Inputs: supporter_id, time_of_appt, medium, selected_tags, location, 
#         specialization, comment (optional), override (boolean)
# Output: 201 Created
def lambda_handler(event, context):
    # take in lambda input
    student = int(event['student_id'])
    supporter = int(event['supporter_id'])
    time_of_appt = event['time_of_appt']
    tags = event['selected_tags']
    selected_tags_str = tags.strip('][').split(', ')
    medium_string = event['medium']
    location = event['location']
    spec_type = event['specialization']
    
    if 'override' in event and event['override'] == "true":
        override = True
    else:
        override = False
    
    if 'comment' in event:
        comment = event['comment']
    else:
        comment = ""
    
    # check that student is in DB
    sql = "SELECT student_id FROM students WHERE student_id = :student"
    sql_parameters = [
        {'name' : 'student', 'value': {'longValue': student}}
    ]
    check_student = query(sql, sql_parameters)
    
    # if student does not exist in DB, raise exception
    if(check_student['records'] == []):
        raise LambdaException("404: Student does not exist.")

    # check that supporter is in DB
    sql = "SELECT supporter_id FROM supporters WHERE supporter_id = :supporter"
    sql_parameters = [
        {'name' : 'supporter', 'value': {'longValue': supporter}}
    ]
    check_supporter = query(sql, sql_parameters)
    
    # if supporter does not exist in DB, raise exception
    if(check_supporter['records'] == []):
        raise LambdaException("404: Supporter does not exist.")
    
    # set id variables
    student_id = student
    supporter_id = supporter
    
    # generate and set time_scheduled
    timestamp = time.time() - 240
    time_scheduled = datetime.datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')

    # perform standard checks, if no 'override' parameter
    if not override:
        # Check that date is not in the past
        #if TO_TIMESTAMP(time_of_appt, 'YYYY-MM-DD HH24:MI:SS') > TO_TIMESTAMP(time_scheduled, 'YYYY-MM-DD HH24:MI:SS'):
            #raise LambdaException("404: Invalid time.")

        # Check that time is within a supporter appointment block
        sql = "SELECT (appointment_block_id, max_num_of_appts, start_date, end_date) FROM appointment_block WHERE supporter_id=:supporter_id AND start_date<TO_TIMESTAMP(:time_of_appt, 'YYYY-MM-DD HH24:MI:SS') AND end_date>TO_TIMESTAMP(:time_of_appt, 'YYYY-MM-DD HH24:MI:SS')"
        sql_parameters = [
            {'name' : 'supporter_id', 'value':{'longValue': supporter_id}},
            {'name' : 'time_of_appt', 'value':{'stringValue': time_of_appt}}
        ]
        appt_block_query = query(sql,sql_parameters)
        if appt_block_query['records'] == []:
            raise LambdaException("404: Appointment not in supporter's timeblock.")
        block_id = appt_block_query['records'][0][0]['longValue']
        max_appts = supporter_schedule_query['records'][0][1]['longValue']
        block_start = supporter_schedule_query['records'][0][2]['stringValue']
        block_end = supporter_schedule_query['records'][0][3]['stringValue']
        
        # Check supporter's maximum number of appointments has not  been met
        sql = "SELECT appointment_id FROM scheduled_appointments WHERE supporter_id=:supporter_id AND cancelled=false AND time_of_appt>:block_start AND time_of_appt<:block_end"
        sql_parameters = [
            {'name' : 'supporter_id', 'value':{'longValue': supporter_id}},
            {'name' : 'block_start', 'value':{'stringValue': block_start}},
            {'name' : 'block_end', 'value':{'stringValue': block_end}}
        ]
        block_appts_query = query(sql,sql_parameters)
        num_appts = len(block_appts_query['records'])

        if num_appts+1 > max_appts:
            raise LambdaException("404: Exceeds supporter's maximum number of appointments.")
    
    # generate and set appointment_id 
    sql = "SELECT appointment_id FROM scheduled_appointments ORDER BY appointment_id DESC LIMIT 1"
    sql_parameters = []
    id_query = query(sql,sql_parameters)
    if id_query['records'] == []:
        appointment_id = 0
    else:
        appointment_id = id_query['records'][0][0]['longValue'] + 1
        
    # get appointment medium_id
    sql = "SELECT medium_id FROM medium WHERE medium=:medium_string;"
    sql_parameters = [
        {'name' : 'medium_string', 'value': {'stringValue' : medium_string}}
    ]
    medium_query = query(sql,sql_parameters)  
    if medium_query['records'] == []:
        raise LambdaException("404: Invalid medium type.")
    else:
        medium = medium_query['records'][0][0]['longValue']
    
    # get appointment specialization_id
    sql = "SELECT specialization_type_id FROM specialization_type WHERE specialization_type=:spec_type;"
    sql_parameters = [
        {'name' : 'spec_type', 'value': {'stringValue' : spec_type}}
    ]
    specialization_query = query(sql,sql_parameters)  
    if specialization_query['records'] == []:
        raise LambdaException("404: Invalid specialization.")
    else:
        specialization = specialization_query['records'][0][0]['longValue']

    if not override:
        # Check if provided time is already booked for supporter
        sql = "SELECT duration FROM supporter_specializations WHERE supporter_id=:supporter_id AND specialization_type_id=:specialization;"
        sql_parameters = [
            {'name' : 'supporter_id', 'value': {'longValue' : supporter_id}},
            {'name' : 'specialization', 'value': {'stringValue' : specialization}}
        ]
        duration_query = query(sql,sql_parameters) 
        duration = duration_query['records'][0][0]['longValue']
        end_timestamp = TO_TIMESTAMP(time_of_appt, 'YYYY-MM-DD HH24:MI:SS') + duration
        appt_end = datetime.datetime.fromtimestamp(end_timestamp).strftime('%Y-%m-%d %H:%M:%S')
        
        sql = "SELECT appointment_id FROM scheduled_appointments WHERE supporter_id=:supporter_id AND cancelled=false AND time_of_appt>:time_of_appt AND time_of_appt<:appt_end"
        sql_parameters = [
            {'name' : 'supporter_id', 'value': {'longValue' : supporter_id}},
            {'name' : 'appt_end', 'value': {'stringValue' : appt_end}},
            {'name' : 'time_of_appt', 'value': {'stringValue' : time_of_appt}}
        ]
        conflict_query = query(sql,sql_parameters)
        if conflict_query['records'] != []:
            raise LambdaException("404: Supporter has a conflicting appointment.")

    # get appointment tags
    numTags = len(selected_tags_str)
    tag_ints = []
    sql = "SELECT tag_type_id FROM tag_type WHERE tag_type=%s" % selected_tags_str[0]
    if numTags > 1:
        for tag in range(1, numTags):
            sql = sql + " OR tag_type=%s" % selected_tags_str[tag]
    sql = sql + ";"
    sql_parameters = []
    tag_query = query(sql,sql_parameters)  
    if len(tag_query['records']) != numTags:
        raise LambdaException("404: Invalid tag.")
    else:
        intVal = tag_query['records'][0][0]['longValue']
        tag_ints_str = "{%s" % intVal
        if numTags > 1:
            for x in range(1, numTags):
                intVal = tag_query['records'][x][0]['longValue']
                tag_ints.append(intVal)
                tag_ints_str = tag_ints_str + ", %s" % intVal
        tag_ints_str = tag_ints_str + "}"

    # format query
    # tags taken out as of now
    SQLquery = "INSERT INTO scheduled_appointments(appointment_id, supporter_id, time_of_appt, location, cancelled, time_scheduled, medium) \
        VALUES (:appointment_id, :supporter_id, TO_TIMESTAMP(:time_of_appt, 'YYYY-MM-DD HH24:MI:SS'), :location, false, TO_TIMESTAMP(:time_scheduled, 'YYYY-MM-DD HH24:MI:SS'), :medium);"
    
    # format query parameters
    query_parameters = [
        {'name' : 'appointment_id', 'value': {'longValue' : appointment_id}},
        {'name' : 'supporter_id', 'value':{'longValue': supporter_id}},
        {'name' : 'student_id', 'value':{'longValue': student_id}},
        {'name' : 'time_of_appt', 'value':{'stringValue': time_of_appt}},
        #{'name' : 'tag_ints', 'value':{'arrayValue': {'longValues' : tag_ints}}},
        {'name' : 'specialization', 'value':{'longValue': specialization}},
        {'name' : 'location', 'value':{'stringValue': location}},
        {'name': 'medium', 'value':{'longValue': medium}},
        {'name' : 'time_scheduled', 'value': {'stringValue' : time_scheduled}},
        {'name' : 'comment', 'value':{'stringValue': comment}}
    ]

    # make query
    try:
        response = query(SQLquery, query_parameters)
    except Exception as e:
        raise LambdaException("404: Update to scheduled_appointments failed: " + str(e))

    # query for selected_tags
    sql = "UPDATE scheduled_appointments SET selected_tags='%s' WHERE appointment_id=:appointment_id;"% tag_ints_str
    
    try:
        tags_query = query(sql, query_parameters)
    except Exception as e:
        raise LambdaException("404: Update to selected_tags field failed: " + str(e))


    # query to update student_appointment_relation
    sql = "INSERT INTO student_appointment_relation (student_id, appointment_id, supporter_id, comment) VALUES (:student_id, :appointment_id, :supporter_id, :comment);"

    # update student_appointment_relation
    try:
        response = query(sql, query_parameters)
    except Exception as e:
        raise LambdaException("404: Update to student_appointment_relation failed: " + str(e))

    
    # query to specializations_for_appointment table
    sql = "INSERT INTO specializations_for_appointment (appointment_id, specialization_type_id) VALUES (:appointment_id, :specialization);"
    
    # update specializations table
    try:
        response = query(sql, query_parameters)
    except Exception as e:
        raise LambdaException("404: Update to specializations_for_appointment failed: " + str(e))

    
    """
    #addition by Kyle Noring 4/23/20
    #used to send ICS calendar invites to students and supporters upon appt creation
    sql = "SELECT first_name, last_name, email FROM users WHERE id = :student"
    sql_parameters = [
        {'name' : 'student', 'value': {'longValue': student}}
    ]
    stud_info = query(sql, sql_parameters)['records'][0]
    studs = []
    studs.append(stud_info[0].get("stringValue")+" "+stud_info[1].get("stringValue"))
    stud_emails = []
    stud_emails.append(stud_info[2].get("stringValue"))
    sql = "SELECT first_name, last_name, email from users WHERE id = :supporter"
    sql_parameters = [
        {'name' : 'supporter', 'value': {'longValue': supporter}}
    ]
    supp_info = query(sql, sql_parameters)['records'][0]
    supp = supp_info[0].get("stringValue")+" "+supp_info[1].get("stringValue")
    supp_email = supp_info[2].get("stringValue")
    send_cal_email(supp, supp_email, studs, stud_emails, time_of_appt, duration, location, appt_type)
    #end of addition
    """
    
    # if no error, return 201 Created
    return {
        'statusCode': 201, 
        'body': 'Appointment created.'
    }