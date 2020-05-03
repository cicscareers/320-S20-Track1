#Written by Nhan Le

from package.query_db import query
from package.dictionary_to_list import dictionary_to_list
import json

#Function to create a supporter's settings for account and appointments
#Inputs: supporter_id, first_name, preferred_name, last_name, email, pronouns, gender, link, 
#        phone, bio, picture, employer, title, team_name, list of supporter types 
#        list of tags, list of specialization_types, 
#        notification_type_name, feedback, grad_student, hours_before_ppointment,
#        list of appointment block info, max_students, office, list of major_ids
#Output: 201 created
def create_supporter_settings(event, context):
    supporter_id = event['id']

    #Check if supporter exists
    sql = 'SELECT * FROM supporters WHERE supporter_id = :supporter_id;'
    sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}]
    response = query(sql, sql_parameters)
    if(response['records'] == []):
        return {
            'body': json.dumps("The supporter does not exist"),
            'statusCode': 404
        }

    users = {}
    users['first_name'] = event['first_name']
    users['preferred_name'] = event['preferred_name']
    users['last_name'] = event['last_name']
    users['email'] = event['email']
    users['pronouns'] = event['pronouns']
    users['gender'] = event['gender']
    users['link'] = event['link']
    users['phone'] = event['phone']
    users['bio'] = event['bio']
    users['picture'] = event['picture']
    users['supporter_id'] = supporter_id
    
    supporters = {}
    supporters['employer'] = event['employer']
    supporters['title'] = event['title']
    supporters['team_name'] = event['team_name']
    supporters['feedback'] = event['feedback']
    supporters['office'] = event['office']
    supporters['supporter_id'] = supporter_id

    supporter_types = {}
    supporter_types['professional_staff'] = False
    supporter_types['student_staff'] = False
    supporter_types['alumni'] = False
    supporter_types['faculty'] = False
    supporter_types['other'] = False
    supporter_types['supporter_id'] = supporter_id
    if('professional_staff' in event['supporter_type']):
        supporter_types['professional_staff'] = True
    if('student_staff' in event['supporter_type']):
        supporter_types['student_staff'] = True
    if('alumni' in event['supporter_type']):
        supporter_types['alumni'] = True
    if('faculty' in event['supporter_type']):
        supporter_types['faculty'] = True
    if('other' in event['supporter_type']):
        supporter_types['other'] = True
    
    student_prefs = {}
    student_prefs['grad_student'] = event['grad_student']
    student_prefs['hours_before_appointment'] = event['hours_before_appointment']
    student_prefs['supporter_id'] = supporter_id

    #Lists so you can run the query in a loop so hard code paramerization dicitonary
    specialization_types = event['specialization_types']
    appointment_block = event['appointment_block']
    major_id = event['major_id']
    tags = event['tags']

    #Just one thing in teh table so hard code the parameter
    notification_type_name = [{'name' : 'notification_type_name', 'value': {'stringValue' : event['notificaiton_type_name']}}]

    
    
    return{
        'statuscode': 201
    }