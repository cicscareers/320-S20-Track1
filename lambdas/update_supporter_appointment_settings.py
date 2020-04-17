#Written by Nhan Le

from package.query_db import query
from package.dictionary_to_list import dictionary_to_list
import json

def update_supporter_appointment_settings(event, context):
    supporter_id = event['id']
    max_students = event['max_students']
    duration = event['duration']
    major_id = event['major_id']
    specialization_type_id = event['specialization_type_id']
    job_search = event['job_search']
    grad_student = event['grad_student']

    preferences = {}
    specializations = {}
    majors = {}

    #Check if supporter exists
    sql = 'SELECT * FROM supporters WHERE supporter_id = :supporter_id;'
    sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}]
    response = query(sql, sql_parameters)
    if(response['records'] == []):
        return {
            'body': json.dumps("The supporter does not exist"),
            'statusCode': 404
        }

    #Adding to preferences dictionary
    #The reason I add to the dictionary by adding another dictionary with the value type
    #and then value is for the parameterization
    if(job_search != None):
        preferences['job_search'] = job_search
    if(grad_student != None):
        preferences['grad_student'] = grad_student
    if(job_search == None or grad_student == None): #These values cannot be null
        return{
            'statusCode' : 422 #unproccesable
        }
    preferences['supporter_id'] = supporter_id

    #Adding to specializations dictionary
    specializations['max_students'] = max_students
    specializations['duration'] = duration
    specializations['specialization_type_id'] = specialization_type_id
    specializations['supporter_id'] = supporter_id

    #Adding to majors dictionary
    majors['supporter_id'] = supporter_id
    majors['major_id'] = major_id

    #Execute parameterized query for updating preferences
    sql = 'UPDATE supporter_preferences_for_students SET job_search = :job_search, grad_student = :grad_student WHERE supporter_id = :supporter_id;'
    sql_parameters = dictionary_to_list(preferences)
    pref_response = query(sql, sql_parameters)
    if(pref_response == {}):
        return {
            'statusCode': 304 #not modified
        }

    #Execute parameterized query for updating specializations
    sql = 'UPDATE supporter_specializations SET max_students = :max_students, duration = :duration, \
        specialization_type_id = :specialization_type_id WHERE supporter_id = :supporter_id;'
    sql_parameters = dictionary_to_list(specializations)
    spec_response = query(sql, sql_parameters)
    if(spec_response == {}):
        return {
            'statusCode': 304 #not modified
        }

    #Execute parameterized query for inserting major preference
    sql = 'INSERT INTO supporter_major_preferences(supporter_id, major_id) VALUES (:supporter_id, :major_id)'
    sql_parameters = dictionary_to_list(majors)
    major_response = query(sql, sql_parameters)
    if(major_response["numberOfRecordsUpdated"] == 0):
        return {
            'statusCode': 409 #conflict
        }
    return {
        'statusCode': 200
    }