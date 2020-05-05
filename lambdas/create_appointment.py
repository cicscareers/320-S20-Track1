# Written by Maeve Newman
# Updated 5/2/2020

import json
from package.query_db import query
from package.lambda_exception import LambdaException
import time
import datetime
from package.email_ics import send_cal_email

# function puts the appointment details in the database
# Inputs: time_of_appt, medium, selected_tags, location, 
#         specialization, override (boolean), comment (optional)
#         ONE OF: supporter_id, supporter_email, 
#         ONE OF: student_id, student_email
# Output: 201 Created
def lambda_handler(event, context):
    # take in lambda input
    time_of_appt = event['time_of_appt']
    tags = event['selected_tags']
    selected_tags_str = tags
    medium_string = event['medium']
    location = event['location']
    spec_type = event['specialization']
    
    if 'comment' in event:
        comment = event['comment']
    else:
        comment = ""
    
    if 'override' in event and event['override'] == "true":
        override = True
    else:
        override = False
    
    if override and event['student_id'] == "":
        # look up by email
        if 'student_email' not in event:
            raise LambdaException("404: Must provide student_id or email.")
        # get student_email
        student_email = event['student_email']
        # query users table for user_id
        sql = "SELECT id FROM users WHERE email=:student_email;"
        sql_parameters = [
            {'name' : 'student_email', 'value': {'stringValue' : student_email}}
        ]
        # make query
        try:
            users_query = query(sql,sql_parameters)
        except Exception as e:
            raise LambdaException("404: Query to users table for student's user_id failed: " + str(e))

        if users_query['records'] == []:
            raise LambdaException("404: Invalid student email.")
        else:
            user_id = users_query['records'][0][0]['longValue']
        # query students table for student_id
        sql = "SELECT student_id FROM students WHERE user_id=:user_id;"
        sql_parameters = [
            {'name' : 'user_id', 'value': {'longValue' : user_id}}
        ]
        # make query
        try:
            students_query = query(sql,sql_parameters)
        except Exception as e:
            raise LambdaException("404: Query to students table for student_id failed: " + str(e))

        if students_query['records'] == []:
            raise LambdaException("404: Email does not belong to a student.")
        else:
            student_id = students_query['records'][0][0]['longValue']

    else:
        student = int(event['student_id'])
        # check that student is in DB
        sql = "SELECT student_id FROM students WHERE student_id = :student"
        sql_parameters = [
            {'name' : 'student', 'value': {'longValue': student}}
        ]
        # make query
        try:
            check_student = query(sql, sql_parameters)
        except Exception as e:
            raise LambdaException("404: Query to verify student_id failed: " + str(e))
        
        # if student does not exist in DB, raise exception
        if(check_student['records'] == []):
            raise LambdaException("404: Student does not exist.")
        
        # set student_id variable
        student_id = student

    if override and event['supporter_id'] == "":
        #look up by email
        if 'supporter_email' not in event:
            raise LambdaException("404: Must provide supporter_id or email.")
        # get supporter_email
        supporter_email = event['supporter_email']
        # query users table for user_id
        sql = "SELECT id FROM users WHERE email=:supporter_email;"
        sql_parameters = [
            {'name' : 'supporter_email', 'value': {'stringValue' : supporter_email}}
        ]
        
        # make query
        try:
            users_query = query(sql,sql_parameters)
        except Exception as e:
            raise LambdaException("404: Query to users table for supporter's user_id failed: " + str(e))

        if users_query['records'] == []:
            raise LambdaException("404: Invalid supporter email.")
        else:
            user_id = users_query['records'][0][0]['longValue']
        
        # query supporters table for supporter_id
        sql = "SELECT supporter_id FROM supporters WHERE user_id=:user_id;"
        sql_parameters = [
            {'name' : 'user_id', 'value': {'longValue' : user_id}}
        ]
        
        # make query
        try:
            supporters_query = query(sql,sql_parameters)
        except Exception as e:
            raise LambdaException("404: Query to supporters table for supporter_id failed: " + str(e))

        if supporters_query['records'] == []:
            raise LambdaException("404: Email does not belong to a supporter.")
        else:
            supporter_id = supporters_query['records'][0][0]['longValue']

    else:
        supporter = int(event['supporter_id'])
        # check that supporter is in DB
        sql = "SELECT supporter_id FROM supporters WHERE supporter_id = :supporter"
        sql_parameters = [
            {'name' : 'supporter', 'value': {'longValue': supporter}}
        ]
        
        # make query
        try:
            check_supporter = query(sql, sql_parameters)
        except Exception as e:
            raise LambdaException("404: Query to supporters table to verify supporter_id failed: " + str(e))
        
        # if supporter does not exist in DB, raise exception
        if(check_supporter['records'] == []):
            raise LambdaException("404: Supporter does not exist.")
        
        # set supporter_id variable
        supporter_id = supporter


    # generate and set time_scheduled
    timestamp = time.time()
    currtimestamp = datetime.datetime.fromtimestamp(timestamp) - datetime.timedelta(hours=4)
    time_scheduled = currtimestamp.strftime('%Y-%m-%d %H:%M:%S')
    

    # perform standard checks, if no 'override' parameter
    if not override:
        # Check that date is not in the past
        appt_timestamp = datetime.datetime.strptime(time_of_appt, '%Y-%m-%d %H:%M:%S')

        difference = appt_timestamp - currtimestamp
        if difference.total_seconds() < 0:
            raise LambdaException("404: Invalid time: Appointment time is in the past.")

        # Check that time is within a supporter appointment block
        sql = "SELECT (appointment_block_id, max_num_of_appts, start_date, end_date) FROM appointment_block WHERE supporter_id=:supporter_id AND start_date<=TO_TIMESTAMP(:time_of_appt, 'YYYY-MM-DD HH24:MI:SS') AND end_date>TO_TIMESTAMP(:time_of_appt, 'YYYY-MM-DD HH24:MI:SS');"
        sql_parameters = [
            {'name' : 'supporter_id', 'value':{'longValue': supporter_id}},
            {'name' : 'time_of_appt', 'value':{'stringValue': time_of_appt}}
        ]
        
        # make query
        try:
            appt_block_query = query(sql,sql_parameters)
        except Exception as e:
            raise LambdaException("404: Query to appointment_block table failed: " + str(e))

        if appt_block_query['records'] == []:
            raise LambdaException("404: Appointment not in supporter's timeblock.")
        response = appt_block_query['records'][0][0]['stringValue']
        responseList = response.strip('()').split(',')
        block_id = int(responseList[0])
        max_appts = int(responseList[1])
        block_start = responseList[2].strip('"')
        block_end = responseList[3].strip('"')
        
        # Check supporter's maximum number of appointments has not  been met
        sql = "SELECT appointment_id FROM scheduled_appointments WHERE supporter_id=:supporter_id AND cancelled=false AND time_of_appt>=TO_TIMESTAMP(:block_start, 'YYYY-MM-DD HH24:MI:SS') AND time_of_appt<TO_TIMESTAMP(:block_end, 'YYYY-MM-DD HH24:MI:SS');"
        sql_parameters = [
            {'name' : 'supporter_id', 'value':{'longValue': supporter_id}},
            {'name' : 'block_start', 'value':{'stringValue': block_start}},
            {'name' : 'block_end', 'value':{'stringValue': block_end}}
        ]
        try:
            block_appts_query = query(sql,sql_parameters)
        except Exception as e:
            raise LambdaException("404: Query to scheduled_appointments table to check num_appts failed: " + str(e))
        num_appts = len(block_appts_query['records'])
        if num_appts+1 > max_appts:
            raise LambdaException("404: Exceeds supporter's maximum number of appointments.")
    
    # generate and set appointment_id 
    sql = "SELECT appointment_id FROM scheduled_appointments ORDER BY appointment_id DESC LIMIT 1"
    sql_parameters = []
    
    # make query
    try:
        id_query = query(sql,sql_parameters)
    except Exception as e:
        raise LambdaException("404: Query to scheduled_appointments table for appointment_id failed: " + str(e))

    if id_query['records'] == []:
        appointment_id = 0
    else:
        appointment_id = id_query['records'][0][0]['longValue'] + 1
        
    # get appointment medium_id
    sql = "SELECT medium_id FROM medium WHERE medium=:medium_string;"
    sql_parameters = [
        {'name' : 'medium_string', 'value': {'stringValue' : medium_string}}
    ]
    
    # make query
    try:
        medium_query = query(sql,sql_parameters)
    except Exception as e:
        raise LambdaException("404: Query to medium table failed: " + str(e))
    
    if medium_query['records'] == []:
        raise LambdaException("404: Invalid medium type.")
    else:
        medium = medium_query['records'][0][0]['longValue']
    
    # get appointment specialization_id
    sql = "SELECT specialization_type_id FROM specialization_type WHERE specialization_type=:spec_type;"
    sql_parameters = [
        {'name' : 'spec_type', 'value': {'stringValue' : spec_type}}
    ]
    
    # make query
    try:
        specialization_query = query(sql,sql_parameters)
    except Exception as e:
        raise LambdaException("404: Query to specialization_type table failed: " + str(e))

    if specialization_query['records'] == []:
        raise LambdaException("404: Invalid specialization.")
    else:
        specialization = specialization_query['records'][0][0]['longValue']

    if not override:
        # Check if provided time is already booked for supporter
        # get duration of appointment
        sql = "SELECT duration FROM supporter_specializations WHERE supporter_id=:supporter_id AND specialization_type_id=:specialization;"
        sql_parameters = [
            {'name' : 'supporter_id', 'value': {'longValue' : supporter_id}},
            {'name' : 'specialization', 'value': {'longValue' : specialization}}
        ]
        
        # make query
        try:
            duration_query = query(sql,sql_parameters)
        except Exception as e:
            raise LambdaException("404: Query to supporter_specializations table failed: " + str(e))
        
        if duration_query['records'] == []:
            raise LambdaException("404: Specialization type has no specified appointment duration.")
        else:
            duration = duration_query['records'][0][0]['longValue']
        
        # get end time by advancing start time by 'duration'
        appt_start_time = datetime.datetime.strptime(time_of_appt, '%Y-%m-%d %H:%M:%S') #convert start time to datetime
        appt_type_advanced = appt_start_time + datetime.timedelta(minutes=duration) #advance by duration in minutes
        appt_end = appt_type_advanced.strftime('%Y-%m-%d %H:%M:%S') #convert endtime to str
        
        # check if supporter has an appointment that starts between proposed start and end time
        sql = "SELECT appointment_id FROM scheduled_appointments WHERE supporter_id=:supporter_id AND cancelled=false AND time_of_appt<TO_TIMESTAMP(:appt_end, 'YYYY-MM-DD HH24:MI:SS') AND time_of_appt>=TO_TIMESTAMP(:time_of_appt, 'YYYY-MM-DD HH24:MI:SS');"
        sql_parameters = [
            {'name' : 'supporter_id', 'value': {'longValue' : supporter_id}},
            {'name' : 'appt_end', 'value': {'stringValue' : appt_end}},
            {'name' : 'time_of_appt', 'value': {'stringValue' : time_of_appt}}
        ]
        
        # make query
        try:
            conflict_query = query(sql,sql_parameters)
        except Exception as e:
            raise LambdaException("404: Query to scheduled_appointments table for supporter's appointments failed: " + str(e))

        if conflict_query['records'] != []:
            raise LambdaException("404: Supporter has a conflicting appointment.")

    # get appointment tags
    if selected_tags_str != "[]":
        tag_ints = []
        input_tag_list = tags.strip('][').split(', ')
        numTags = len(input_tag_list)
        sql = "SELECT tag_type_id FROM tag_type WHERE tag_type=%s" % input_tag_list[0]
        if numTags > 1:
            for tag in range(1, numTags):
                sql = sql + " OR tag_type=%s" % input_tag_list[tag]
        sql = sql + ";"
        sql_parameters = []
        
        # make query
        try:
            tag_query = query(sql,sql_parameters)
        except Exception as e:
            raise LambdaException("404: Query to tag_type table failed: " + str(e))

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
    else:
        tag_ints_str = "{}"

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
        {'name' : 'specialization', 'value':{'longValue': specialization}},
        {'name' : 'location', 'value':{'stringValue': location}},
        {'name': 'medium', 'value':{'longValue': medium}},
        {'name' : 'time_scheduled', 'value': {'stringValue' : time_scheduled}},
        {'name' : 'comment', 'value':{'stringValue': comment}}
    ]

    # make query
    try:
        insert_query = query(SQLquery, query_parameters)
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
    
    # if no error, return 201 Created
    return {
        'statusCode': 201, 
        'body': 'Appointment created.'
    }
