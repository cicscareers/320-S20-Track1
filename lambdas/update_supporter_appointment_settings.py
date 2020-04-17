#Written by Nhan Le

from package.query_db import query
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

    #Adding to preferences dictionary
    #The reason I add to the dictionary by adding another dictionary with the value type
    #and then value is for the parameterization
    if(job_search != None):
        preferences['job_search'] = {'booleanValue': job_search}
    if(grad_student != None):
        preferences['grad_student'] = {'booleanValue': grad_student}
    if(job_search == None or grad_student == None): #These values cannot be null
        return{
            'statusCode' : 422 #unproccesable
        }
    preferences['supporter_id'] = {'longValue': supporter_id}

    #Adding to specializations dictionary
    specializations['max_students'] = {'longValue': max_students}
    specializations['duration'] = {'longValue': duration}
    specializations['specialization_type_id'] = {'longValue': specialization_type_id}
    specializations['supporter_id'] = {'longValue': supporter_id}

    #Adding to majors dictionary
    majors['supporter_id'] = {'longValue': supporter_id}
    majors['major_id'] = {'longValue': major_id}

    #Execute parameterized query for updating preferences
    sql = 'UPDATE supporter_preferences_for_students SET job_search = :job_search, grad_student = :grad_student WHERE supporter_id = :supporter_id;'
    sql_parameters = dictionary_to_list(preferences)
    response = query(sql, sql_parameters)
    #response['records']
    #check response for status code

    #Execute parameterized query for updating specializations
    sql = 'UPDATE supporter_specializations SET max_students = :max_students, duration = :duration, \
        specialization_type_id = :specialization_type_id WHERE supporter_id = :supporter_id;'
    sql_parameters = dictionary_to_list(specializations)
    response = query(sql, sql_parameters)
    #response['records']
    #check response for status code

    #Execute parameterized query for inserting major preference
    sql = 'INSERT INTO supporter_major_preferences (supporter_id, major_id) VALUES (:supporter_id, :major_id);'
    sql_parameters = dictionary_to_list(majors)
    response = query(sql, sql_parameters)
    #response["numberOfRecordsUpdated"]
    #check response for status code

    return {
        'statusCode': 200
    }

def dictionary_to_list(dictionary):
    params = []
    #For each key, name = key and value = dictionary {value type : value}
    for key in dictionary.keys():
        params.append({'name': key, 'value': dictionary[key]})
    return params