#Written by Nhan Le

from package.query_db import query
from package.dictionary_to_list import dictionary_to_list
import json

#Function to create a supporter's settings for account and appointments
#Inputs: first_name, preferred_name, last_name, email, employer, title, 
#        grad_student, hours_before_appointment
#Output: 201 created
def create_supporter_settings(event, context):
    # checking if user exists
    sql = "SELECT email FROM users WHERE email = :email;"
    sql_parameters = [{'name': 'email', 'value': {'stringValue': event['email']}}]
    check_user = query(sql, sql_parameters)
    if check_user['records'] != []:
        return {
            'body': json.dumps("Email already exists in the database"),
            'statusCode': 409
        }

    # creates id
    sql = "SELECT id FROM users ORDER BY id DESC LIMIT 1;"
    sql_parameters = []
    supporter_id = query(sql, sql_parameters)['records'][0][0]['longValue'] + 1

    users = {}
    users['first_name'] = event['first_name']
    users['last_name'] = event['last_name']
    users['email'] = event['email']
    users['supporter_id'] = supporter_id
    
    supporters = {}
    supporters['employer'] = event['employer']
    supporters['title'] = event['title']
    supporters['supporter_id'] = supporter_id
    
    student_prefs = {}
    student_prefs['grad_student'] = event['grad_student']
    student_prefs['hours_before_appointment'] = event['hours_before_appointment']
    student_prefs['supporter_id'] = supporter_id

    #Insert data into users table
    sql = 'INSERT INTO users VALUES (:supporter_id, :first_name, :last_name, \
          :email, null, null, null, null, null, null, \
          False, False, False, True, False)'
    sql_parameters = dictionary_to_list(users)
    users_response = query(sql, sql_parameters)
    if(users_response["numberOfRecordsUpdated"] == 0):
        return {
            'body': json.dumps("Users info was not added"),
            'statusCode': 409 #conflict
        }
    
    #Insert data into supporters table
    sql = 'INSERT INTO supporters VALUES (:supporter_id, :supporter_id, :employer, :title, False, null, null, False, null)'
    sql_parameters = dictionary_to_list(supporters)
    response = query(sql, sql_parameters)
    if(response["numberOfRecordsUpdated"] == 0):
        return {
            'body': json.dumps("Supporters info was not added"),
            'statusCode': 409 #conflict
        }

    #Insert data into supporter prefernces for students table
    sql = 'INSERT INTO supporter_type VALUES (:supporter_id, False, False, False, False, False)'
    sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}]
    response = query(sql, sql_parameters)
    if(response == {}):
        return {
            'body': json.dumps("supporter_types could not be added"),
            'statusCode': 409 #conflict
        }

    #Insert data into supporter prefernces for students table
    sql = 'INSERT INTO supporter_preferences_for_students VALUES (:supporter_id, :supporter_id, :grad_student, :hours_before_appointment)'
    sql_parameters = dictionary_to_list(student_prefs)
    response = query(sql, sql_parameters)
    if(response == {}):
        return {
            'body': json.dumps("supporter_preferences_for_students could not be added"),
            'statusCode': 409 #conflict
        }

    temp_dict = {}
    temp_dict['supporter_id'] = supporter_id

    sql = 'INSERT INTO supporter_specializations VALUES (:supporter_id, null, null, null)'
    sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}]
    response = query(sql, sql_parameters)
    if(response == {}):
        return {
            'body': json.dumps("Specialization could not be added"),
            'statusCode': 409 #conflict
        }
    
    # #Insert major preferences
    sql = 'INSERT INTO supporter_major_preferences VALUES (:supporter_id, null)'
    sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}] #, {'name': 'major_id', 'value': {'longValue': maj['major_id']}}]
    response = query(sql, sql_parameters)
    if(response == {}):
        return {
            'body': json.dumps("Major could not be added"),
            'statusCode': 409 #conflict
        }

    sql = 'INSERT INTO supporter_minor_preferences VALUES (:supporter_id, null)'
    sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}] #, {'name': 'minor_id', 'value': {'longValue': minor['minor_id']}}]
    response = query(sql, sql_parameters)
    if(response == {}):
        return {
            'body': json.dumps("Minor could not be added"),
            'statusCode': 409 #conflict
        }

    #Insert links
    sql = 'INSERT INTO user_link VALUES (:supporter_id, null, null)'
    sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}]
    response = query(sql, sql_parameters)
    if(response == {}):
        return {
            'body': json.dumps("Link could not be added"),
            'statusCode': 409 #conflict
        }
        
    #Insert tags
    sql = 'INSERT INTO supporter_tags VALUES (:supporter_id, null)'
    sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}]
    response = query(sql, sql_parameters)
    if(response == {}):
        return {
            'body': json.dumps("Tags could not be added"),
            'statusCode': 409 #conflict
        }
    
    #Insert notification type
    sql = 'INSERT INTO notification_preferences VALUES (:supporter_id, :supporter_id, null)'
    sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}]
    response = query(sql, sql_parameters)
    if(response == {}):
        return {
            'body': json.dumps("Notification_type could not be added"),
            'statusCode': 409 #conflict
        }

    return{
        'statuscode': 201
    }