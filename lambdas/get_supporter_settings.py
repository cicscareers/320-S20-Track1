#Written by Nhan Le

from package.query_db import query
import json

#Function to update a supporter's settings
#Inputs: supporter_id
#Output: first_name, preferred_name, last_name, email, pronouns, gender, link, 
#        phone, bio, picture, employer, title, team_name, professional_staff, student_staff,
#        alumni, faculty, other, list of tags, list of specialization_types, 
#        notification_type_name, feedback, list of supporter_preferences_for_student,
#        list of appointment durations (for each specialization), max_students, google_doc_link, office, list of majors and major_id
# ^^^ fix

def get_supporter_settings(event, context):
    supporter_id = event['id']
    block = {}

    #Check if supporter exists
    sql = 'SELECT * FROM supporters WHERE supporter_id = :supporter_id;'
    sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}]
    response = query(sql, sql_parameters)
    if(response['records'] == []):
        return {
            'body': json.dumps("The supporter does not exist"),
            'statusCode': 404
        }

    #Execute parameterized query to get user info
    sql = 'SELECT first_name, preferred_name, last_name, email, pronouns, gender, phone, \
           bio, picture, employer, title, team_name, feedback, office, google_doc_link FROM users, supporters \
           WHERE users.id = supporters.supporter_id AND users.id = :supporter_id;'
    sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}]
    settings = query(sql, sql_parameters)['records']
    if(settings == []):
        return {
            'body': json.dumps("User's info could not be found"),
            'statusCode': 404
        }
    block['first_name'] = settings[0][0].get('stringValue')
    block['preferred_name'] = settings[0][1].get('stringValue')
    block['last_name'] = settings[0][2].get('stringValue')
    block['email'] = settings[0][3].get('stringValue')
    block['pronouns'] = settings[0][4].get('stringValue')
    block['gender'] = settings[0][5].get('stringValue')
    block['phone'] = settings[0][6].get('stringValue')
    block['bio'] = settings[0][7].get('stringValue')
    block['picture'] = settings[0][8].get('stringValue')
    block['employer'] = settings[0][9].get('stringValue')
    block['title'] = settings[0][10].get('stringValue')
    block['team_name'] = settings[0][11].get('stringValue')
    block['feedback'] = settings[0][12].get('stringValue')
    block['office'] = settings[0][13].get('stringValue')
    block['google_doc_link'] = settings[0][14].get('stringValue')

    #Execute parameterized query to get supporter types
    sql = 'SELECT professional_staff, student_staff, alumni, faculty, other \
           FROM supporter_types WHERE supporter_id = :supporter_id;'
    sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}]
    settings = query(sql, sql_parameters)['records']
    if(settings == []):
        return {
            'body': json.dumps("Supporter types info could not be found"),
            'statusCode': 404
        }
    block['professional_staff'] = settings[0][0].get('booleanValue')
    block['student_staff'] = settings[0][1].get('booleanValue')
    block['alumni'] = settings[0][2].get('booleanValue')
    block['faculty'] = settings[0][3].get('booleanValue')
    block['other'] = settings[0][4].get('booleanValue')

    #Execute parameterized query to get specialization types and durations
    sql = 'SELECT S1.max_students, S1.duration, S2.specialization_type \
           FROM supporter_specializations S1, specialization_type S2 \
           WHERE S1.specialization_type_id = S2.specialization_type_id AND S1.supporter_id = :supporter_id;'
    sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}]
    specials = query(sql, sql_parameters)['records']
    if(specials == []):
        return {
            'body': json.dumps("Supporter specialization types and duration info could not be found"),
            'statusCode': 404
        }
    specialization_types = [] #List of specialization types
    durations = [] #List of appointment durations and type
    for entry in specials:
        dur = {}
        spec = {}
        spec['specialization_type'] = entry[2].get('stringValue')
        dur['specialization_type'] = entry[2].get('stringValue')
        dur['duration'] = entry[1].get('longValue')
        dur['max_students'] = entry[0].get('longValue')
        if(spec not in specialization_types):
            specialization_types.append(spec)
        if(dur not in durations):
            durations.append(dur)
    block['specialization_types'] = specialization_types
    block['appointment_type_info'] = durations

    #Execute parameterized query to get supporter preferences for students
    sql = 'SELECT S1.grad_student, S1.job_search, S2.major_id, M.major \
           FROM supporter_preferences_for_students S1, supporter_major_preferences S2, major M \
           WHERE S1.supporter_preferences_for_student_id = S2.supporter_id AND S2.major_id = M.major_id \
           AND S1.supporter_preferences_for_student_id = :supporter_id;'
    sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}]
    prefs = query(sql, sql_parameters)['records']
    if(prefs == []):
        return {
            'body': json.dumps("Supporter preference info could not be found"),
            'statusCode': 404
        }
    majors = []
    block['grad_student'] = prefs[0][0].get('booleanValue')
    block['job_search'] = prefs[0][1].get('booleanValue')
    for entry in prefs:
        temp_dict = {}
        temp_dict['major_id'] = entry[2].get('longValue')
        temp_dict['major'] = entry[3].get('longValue')
        majors.append(temp_dict)

    #Execute parameterized query to get tags
    sql = 'SELECT tags FROM tags WHERE supporter_id = :supporter_id;'
    sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}]
    settings = query(sql, sql_parameters)['records']
    if(settings != []):
        block['tags'] = settings[0][0].get('arrayValue')
    if(settings == []):
        block['tags'] = None

    #Execute parameterized query to get tags
    sql = 'SELECT N2.notification_type_name FROM notification_preferences N1, notification_type N2 \
           WHERE N1.notification_type_id = N2.notification_type_id AND N1.user_id = :supporter_id;'
    sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}]
    settings = query(sql, sql_parameters)['records']
    if(settings != []):
        block['notification_type_name'] = settings[0][0].get('stringValue')
    if(settings == []):
        block['notification_type_name'] = None

    #Execute parameterized query to get link
    sql = 'SELECT L2.link FROM user_link L1, link L2 \
           WHERE L1.link_id = L2.link_id AND L1.user_id = :supporter_id;'
    sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}]
    settings = query(sql, sql_parameters)['records']
    if(settings != []):
        block['link'] = settings[0][0].get('stringValue')
    if(settings == []):
        block['link'] = None

    return {
        'body': json.dumps(block),
        'statusCode': 200
    }