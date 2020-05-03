#Written by Nhan Le

from package.query_db import query
from package.dictionary_to_list import dictionary_to_list
import json

#Function to create a supporter's settings for account and appointments
#Inputs: supporter_id, first_name, preferred_name, last_name, email, pronouns, gender, link, 
#        phone, bio, picture, employer, title, team_name, list of supporter types 
#        list of tags, notification_type_name, feedback, grad_student, hours_before_appointment,
#        list of appointment block info, max_students, office, list of major_ids, list of minor_ids
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

    # users = {}
    # users['first_name'] = event['first_name']
    # users['preferred_name'] = event['preferred_name']
    # users['last_name'] = event['last_name']
    # users['email'] = event['email']
    # users['pronouns'] = event['pronouns']
    # users['gender'] = event['gender']
    # users['phone'] = event['phone']
    # users['bio'] = event['bio']
    # users['picture'] = event['picture']
    # users['supporter_id'] = supporter_id
    
    # supporters = {}
    # supporters['employer'] = event['employer']
    # supporters['title'] = event['title']
    # supporters['team_name'] = event['team_name']
    # supporters['feedback'] = event['feedback']
    # supporters['office'] = event['office']
    # supporters['supporter_id'] = supporter_id

    # supporter_types = {}
    # supporter_types['professional_staff'] = False
    # supporter_types['student_staff'] = False
    # supporter_types['alumni'] = False
    # supporter_types['faculty'] = False
    # supporter_types['other'] = False
    # supporter_types['supporter_id'] = supporter_id
    # if('professional_staff' in event['supporter_type']):
    #     supporter_types['professional_staff'] = True
    # if('student_staff' in event['supporter_type']):
    #     supporter_types['student_staff'] = True
    # if('alumni' in event['supporter_type']):
    #     supporter_types['alumni'] = True
    # if('faculty' in event['supporter_type']):
    #     supporter_types['faculty'] = True
    # if('other' in event['supporter_type']):
    #     supporter_types['other'] = True
    
    student_prefs = {}
    student_prefs['grad_student'] = event['grad_student']
    student_prefs['hours_before_appointment'] = event['hours_before_appointment']
    student_prefs['supporter_id'] = supporter_id

    #Lists so you can run the query in a loop so hard code paramerization dicitonary
    appointment_block = event['appointment_block']
    major_id = event['major_id']
    minor_id = event['minor_id']
    link = event['link']
    tags = event['tags']

    #Just one thing in the table so hard code the parameter
    notification_type_name = [{'name' : 'notification_type_name', 'value': {'stringValue' : event['notificaiton_type_name']}}]

    # #Insert data into users table
    # sql = 'INSERT INTO users VALUES (:supporter_id, :first_name, :last_name, \
    #       :email, :preferred_name, :picture, :bio, :pronouns, :gender, :phone, \
    #       False, False, False, True, False)'
    # sql_parameters = dictionary_to_list(users)
    # users_response = query(sql, sql_parameters)
    # if(users_response["numberOfRecordsUpdated"] == 0):
    #     return {
    #         'body': json.dumps("Users info was not added"),
    #         'statusCode': 409 #conflict
    #     }
    
    # #Insert data into supporters table
    # sql = 'INSERT INTO supporters VALUES (:supporter_id, :supporter_id, :employer \
    #     :title, :feedback, 0, :team_name, False, :office)'
    # sql_parameters = dictionary_to_list(supporters)
    # minor_response = query(sql, sql_parameters)
    # if(minor_response["numberOfRecordsUpdated"] == 0):
    #     return {
    #         'body': json.dumps("Supporters info was not added"),
    #         'statusCode': 409 #conflict
    #     }

    #Insert data into supporter prefernces for students table
    sql = 'INSERT INTO supporter_preferences_for_students VALUES (:supporter_id, :grad_student, :hours_before_appointment)'
    sql_parameters = dictionary_to_list(student_prefs)
    response = query(sql, sql_parameters)
    if(response == {}):
        return {
            'body': json.dumps("supporter_preferences_for_students could not be added"),
            'statusCode': 409 #conflict
        }

    #Insert appointment block information for specializations
    for spec in appointment_block:
        sql = 'SELECT specialization_type_id FROM specialization_type WHERE specialization_type = :specialization_type;'
        sql_parameters = [{'name' : 'specialization_type', 'value': {'stringValue': spec['specialization_type']}}]
        spec_id_response = query(sql, sql_parameters)['records']
        if(spec_id_response == []):
            return{
                'body': json.dumps("Could not find specialization type: " + spec['specialization_type'])
            }
        temp_dict = {}
        temp_dict['duration'] = spec['duration']
        temp_dict['max_students'] = spec['max_students']
        temp_dict['supporter_id'] = supporter_id
        temp_dict['specialization_type_id'] = spec_id_response[0][0].get('longValue')

        sql = 'INSERT INTO supporter_specializations VALUES (:supporter_id, :max_student, \
              :duration, :specialization_type_id)'
        sql_parameters = dictionary_to_list(temp_dict)
        response = query(sql, sql_parameters)
        if(response == {}):
            return {
                'body': json.dumps(spec['specialization_type'] + " could not be added"),
                'statusCode': 409 #conflict
            }
    
    #Insert major preferences
    for maj in major_id:
        sql = 'INSERT INTO supporter_major_preferences VALUES (:supporter_id, :major_id)'
        sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}, {'name': 'major_id', 'value': {'longValue': maj['major_id']}}]
        response = query(sql, sql_parameters)
        if(response == {}):
            return {
                'body': json.dumps("Major could not be added"),
                'statusCode': 409 #conflict
            }

    #Insert minor preferences
    for minor in minor_id:
        sql = 'INSERT INTO supporter_mminor_preferences VALUES (:supporter_id, :minor_id)'
        sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}, {'name': 'minor_id', 'value': {'longValue': minor['minor_id']}}]
        response = query(sql, sql_parameters)
        if(response == {}):
            return {
                'body': json.dumps("Minor could not be added"),
                'statusCode': 409 #conflict
            }

    #Insert links
    for entry in link:
        sql = 'SELECT link_id FROM link WHERE link_type = :link_type;'
        sql_parameters = [{'name' : 'link_type', 'value': {'stringValue': entry['link_type']}}]
        id_response = query(sql, sql_parameters)['records']
        if(id_response == []):
            return{
                'body': json.dumps("Could not find link type: " + entry['link_type'])
            }
        temp_dict = {}
        temp_dict['supporter_id'] = supporter_id
        temp_dict['link'] = entry['link']
        temp_dict['link_id'] = id_response[0][0].get('longValue')

        sql = 'INSERT INTO user_link VALUES (:supporter_id, :link_id, :link)'
        sql_parameters = dictionary_to_list(temp_dict)
        response = query(sql, sql_parameters)
        if(response == {}):
            return {
                'body': json.dumps("Link could not be added"),
                'statusCode': 409 #conflict
            }
        
    #Insert tags
    for entry in tags:
        sql = 'SELECT tag_type_id FROM tag_type WHERE tag_type = :tag_type;'
        sql_parameters = [{'name' : 'tag_type', 'value': {'stringValue': entry['tag_type']}}]
        id_response = query(sql, sql_parameters)['records']
        if(id_response == []):
            return{
                'body': json.dumps("Could not find tag type: " + entry['link_type'])
            }
        temp_dict = {}
        temp_dict['supporter_type'] = supporter_id
        temp_dict['tag_type_id'] = id_response[0][0].get('longValue')

        sql = 'INSERT INTO supporter_tags VALUES (:supporter_id, :tag_type_id)'
        sql_parameters = dictionary_to_list(temp_dict)
        response = query(sql, sql_parameters)
        if(response == {}):
            return {
                'body': json.dumps("Tags could not be added"),
                'statusCode': 409 #conflict
            }
    
    #Insert notification type
    sql = 'SELECT notification_type_id FROM notification_type WHERE notification_type_name = :notificaiton_type_name;'
    sql_parameters = notification_type_name
    id_response = query(sql, sql_parameters)['records']
    if(id_response == []):
        return{
            'body': json.dumps("Could not find notification type id")
        }
    temp_dict = {}
    temp_dict['notification_type_id'] = id_response[0][0].get('longValue')
    sql = 'INSERT INTO notification_preferences VALUES (:supporter_id, :supporter_id, :notification_type_id)'
    sql_parameters = dictionary_to_list(temp_dict)
    response = query(sql, sql_parameters)
    if(response == {}):
        return {
            'body': json.dumps("Tags could not be added"),
            'statusCode': 409 #conflict
        }

    return{
        'statuscode': 201
    }