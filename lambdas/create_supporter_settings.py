#Written by Nhan Le

from package.query_db import query
from package.dictionary_to_list import dictionary_to_list
import json

#Function to create a supporter's settings for account and appointments
#Inputs: supporter_id, first_name, preferred_name, last_name, email, pronouns, gender, link, 
#        phone, bio, picture, employer, title, team_name, professional_staff, student_staff,
#        alumni, faculty, other, list of tags, list of specialization_types, 
#        notification_type_name, feedback, list of supporter_preferences_for_student,
#        list of appointment durations (for each specialization), max_students, 
#        office, list of majors and major_id
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


    return{
        'statuscode': 201
    }