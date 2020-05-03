#Written by Nhan Le and Hadley Pope

from package.query_db import query
from package.lambda_exception import LambdaException
from package.dictionary_to_list import dictionary_to_list
import json

#Function to update a supporter's settings
#Inputs: first_name, last_name, email, preferred_name, picture, bio, pronouns, gender, phone, 
#        id, employer, title, team_name, office,
#        hours_before_appointment, grad_student,
#        specialization_type_id, max_students, duration,
#        list of link_id/link pairs, notification_preferences,
#        list of tag_type_ids, list of major_ids, list of minor_ids,         
#Output: 200 OK

def update_supporter_settings(event, context):

    supporter_id = event['id']    

    #Check if supporter exists
    sql = 'SELECT * FROM supporters WHERE supporter_id = :supporter_id;'
    supporter_id_param = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}]
    response = query(sql, supporter_id_param)
    if(response['records'] == []):
        raise LambdaException("404: Supporter does not exist")


    link_list = event['links']

    #Check if link_id exists
    for link_id, link in link_list:
        sql = 'SELECT * FROM link WHERE link_id = :link_id;'
        sql_parameters = [{'name': 'link_id', 'value': {'longValue': entry}}]
        response = query(sql, sql_parameters)
        if(response['records'] ==[]):
            raise LambdaException("404: link_id:" + str(entry) + " does not exist")


    tag_type_id_list = event['tags']

    #Check if tag_type_id exists
    for entry in tag_type_id_list:
        sql = 'SELECT * FROM tag_type WHERE tag_type_id = :tag_type_id;'
        sql_parameters = [{'name': 'tag_type_id', 'value': {'longValue': entry}}]
        response = query(sql, sql_parameters)
        if(response['records'] ==[]):
            raise LambdaException("404: tag_type_id:" + str(entry) + " does not exist")


    major_id_list = event['major_id']

    #Check if major_id exists
    for entry in major_id_list:
        sql = 'SELECT * FROM major WHERE major_id = :major_id;'
        sql_parameters = [{'name': 'major_id', 'value': {'longValue': entry}}]
        response = query(sql, sql_parameters)
        if(response['records'] ==[]):
            raise LambdaException("404: major_id:" + str(entry) + " does not exist")

    
    #Check if minor_id exists
    minor_id_list = event['minor_id']

    for entry in minor_id_list:
        sql = 'SELECT * FROM minor WHERE minor_id = :minor_id;'
        sql_parameters = [{'name': 'minor_id', 'value': {'longValue': entry}}]
        response = query(sql, sql_parameters)
        if(response['records'] ==[]):
            raise LambdaException("404: minor_id:" + str(entry) + " does not exist")

    #User settings
    user_settings = {}
    updated_user_vals = ""

    if event['first_name'] != "":
        first_name = event['first_name']
        user_settings['first_name'] = first_name
        updated_user_vals += " first_name = :first_name, "

    if event['last_name'] != "":        
        last_name = event['last_name']
        user_settings['last_name'] = last_name
        updated_user_vals += " last_name = :last_name, "

    if event['preferred_name'] != "":
        preferred_name = event['preferred_name']
        user_settings['preferred_name'] = preferred_name
        updated_user_vals += " preferred_name = :preferred_name, "

    if event['picture'] != "":
        picture = event['picture']
        user_settings['picture'] = picture
        updated_user_vals += " picture = :picture, "

    if event['bio'] != "":
        bio = event['bio']
        user_settings['bio'] = bio
        updated_user_vals += " bio = :bio,"

    if event['pronouns'] ! = "":
        pronouns = event['pronouns']
        user_settings['pronouns'] = pronouns
        updated_user_vals += " pronouns = :pronouns,"

    if event['phone'] != "":
        phone = event['phone']
        user_settings['phone'] = phone
        updated_user_vals += " phone = :phone,"

    user_settings_sql = "UPDATE users SET" + updated_user_vals[:-1] + " WHERE user_id = :supporter_id;"
    user_settings_params = dictionary_to_list(user_settings) 
    user_settings_params.append(supporter_id_param)

    if len(updated_user_vals) > 0:
        try:
            query(user_settings_sql, user_settings_params)
        except Exception as e:
            raise LambdaException("500: Unable to update users table, " + str(e))


    #Supporter Settings
    supporter_settings = {}
    updated_supporter_vals = ""

    if event['employer'] != "":
        employer = event['employer']
        supporter_settings['employer'] = employer
        updated_supporter_vals += " employer = :employer,"

    if event['title'] != "":
        title = event['title']
        supporter_settings['title'] = title
        updated_supporter_vals += " title = :title,"

    if event['team_name'] != "":
        team_name = event['team_name']
        supporter_settings['team_name'] = team_name
        updated_supporter_vals += " team_name = :team_name"

    if event['office'] != "":
        office = event['office']
        supporter_settings['office'] = office
        updated_supporter_vals += " office = :office"

    supporter_settings_sql = "UPDATE supporters SET" + updated_supporter_vals[:-1] + " WHERE supporter_id = :supporter_id;"
    supporter_settings_params = dictionary_to_list(supporter_settings)
    supporter_settings_params.append(supporter_id_param)

    if len(updated_supporter_vals) > 0:
        try:
            query(supporter_settings_sql, supporter_settings_params)
        except Exception as e:
            raise LambdaException("500: Unable to update supporter settings, ")


    #Supporter Specializations
    supporter_specialization = {}
    updated_specializations = ""

    if event['specialization_type_id'] != "":
        specialization_type_id = event['specialization_type_id']
        supporter_specialization['specialization_type_id'] = specialization_type_id
        updated_specializations += " specialization_type_id = :specialization_type_id,"

    if event['max_students'] != "":
        max_students = event['max_students']
        supporter_specialization['max_students'] = max_students
        updated_specializations += " max_students = :max_students,"

    if event['duration'] != "":
        duration = event['duration']
        supporter_specialization['duration'] = duration
        updated_specializations += " duration = :duration,"

    specializations_sql = "UPDATE supporter_specializations SET" + updated_specializations[:-1] + " WHERE supporter_id = :supporter_id;"
    specializations_params = dictionary_to_list(supporter_specialization)
    specializations_params.append(supporter_id_param)

    if len(updated_specializations) > 0:
        try:
            query(specializations_sql, specializations_params)
        except Exception as e:
            raise LambdaException("500: Unable to update specializations, " + str(e))


    #Supporter Preferences for Students
    supporter_student_prefs = {}
    updated_student_prefs = ""

    if event['grad_student'] != "":
        grad_student = event['grad_student']
        supporter_student_prefs['grad_student'] = grad_student
        updated_student_prefs += " grad_student = :grad_student,"

    if event['hours_before_appointment'] != "":
        hours_before_appointment = event['hours_before_appointment']
        supporter_student_prefs['hours_before_appointment'] = hours_before_appointment
        updated_student_prefs += " hours_before_appointment = :hours_before_appointment,"

    student_prefs_sql = "UPDATE supporter_preferences_for_students SET" + updated_student_prefs[:-1] + " WHERE supporter_id = :supporter_id;"
    student_prefs_params = dictionary_to_list(supporter_student_prefs)
    student_prefs_params.append(supporter_id_param)

    if len(updated_student_prefs) > 0:
        try:
            query(student_prefs_sql, student_prefs_params)
        except Exception as e:
            raise LambdaException("500: Unable to update supporter preferences for students, " + str(e))

    
    #User links
    #Execute parameterized query to delete supporter's old links
    sql = "DELETE FROM user_links WHERE use_id = :supporter_id;"
    try:
        query(sql, supporter_id_param)
    except Exception as e:
        raise LambdaException("500: Unable to delete links")

    #Execute parameterized queries for updating links
    for link_id, link in link_list:
        sql = 'INSERT INTO user_links(user_id, link_id, link) VALUES (:user_id, :link_id, :link);'
        sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}, {'name': 'link_id', 'value': {'longValue': link_id}}, {'name': 'link', 'value': {'longValue': link}}]
        major_response = query(sql, sql_parameters)
        if(major_response["numberOfRecordsUpdated"] == 0):
            raise LambdaException("409: User links not updated")



    #Notification preferences

    #notifications_queries stores sql queries and their parameters as tuples
    #As of 4/29 only email notifications are supported
    notifications_queries = []


    #Supporter Tags
    #Execute parameterized query to delete supporter's old tags
    sql = "DELETE FROM supporter_tags WHERE supporter_id = :supporter_id;"
    try:
        query(sql, supporter_id_param)
    except Exception as e:
        raise LambdaException("500: Unable to delete tags")

    #Execute parameterized queries for updating tags
    for entry in tag_type_id_list:
        sql = 'INSERT INTO supporter_tags(supporter_id, tag_type) VALUES (:supporter_id, :tag_type_id);'
        sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}, {'name': 'tag_type_id', 'value': {'longValue': entry}}]
        major_response = query(sql, sql_parameters)
        if(major_response["numberOfRecordsUpdated"] == 0):
            raise LambdaException("409: supporter_tags majors not updated")
    

    #Execute parameterized query to delete supporter's old major preferences
    sql = 'DELETE FROM supporter_major_preferences WHERE supporter_id = :supporter_id;'
    try:
        query(sql, supporter_id_param)
    except Exception as e:
        raise LambdaException("500: Unable to delete major preferences, " + str(e))

    #Execute parameterized queries for updating major preferences
    for entry in major_id_list:
        sql = 'INSERT INTO supporter_major_preferences(supporter_id, major_id) VALUES (:supporter_id, :major_id);'
        sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}, {'name': 'major_id', 'value': {'longValue': entry}}]
        major_response = query(sql, sql_parameters)
        if(major_response["numberOfRecordsUpdated"] == 0):
            raise LambdaException("409: supporter_major_preferences majors not updated")


    #Execute parameterized query to delete supporter's old minor preferences
    sql = 'DELETE FROM supporter_minor_preferences WHERE supporter_id = :supporter_id;'
    try:
        query(sql, supporter_id_param)
    except Exception as e:
        raise LambdaException("500: Unable to delete minor preferences")

    for entry in minor_id_list:
        sql = 'INSERT INTO supporter_major_preferences(supporter_id, minor_id) VALUES (:supporter_id, :minor_id);'
        sql_parameters = [{'name': 'supporter_id', 'value': {'longValue': supporter_id}}, {'name': 'minor_id', 'value': {'longValue': entry}}]
        minor_response = query(sql, sql_parameters)
        if(minor_response["numberOfRecordsUpdated"] == 0):
            raise LambdaException("409: supporter_minorr_preferences minors not updated")
            
    
    return {
        'statusCode': 200
    }