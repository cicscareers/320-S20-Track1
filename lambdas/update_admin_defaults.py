import json
from package.query_db import query

#Written by Matt Hill
#Input: medium_of_appt, max_students_for_specialization, duration_for_specialization, hours_before_appointment_for_supporter
#Output: none

def update_admin_defaults(event,context):

    medium_name = event['medium_of_appt']
    max_students = int(event['max_students_for_specialization'])
    duration = int(event['duration_for_specialization'])
    hours = int(event['hours_before_appointment_for_supporter'])

    sql = 'UPDATE default_table SET medium_of_appt =(SELECT medium_id FROM medium WHERE medium = :medium_name), \
    max_students_for_specialization =:max_students, \
    duration_for_specialization =:duration, \
    hours_before_appointment_for_supporter =:hours'

    sql_parameters = [{'name':'medium_name', 'value' : {'stringValue' : medium_name}},
                        {'name':'max_students', 'value' : {'longValue' : max_students}},
                        {'name':'duration', 'value' : {'longValue' : duration}},
                        {'name':'hours', 'value' : {'longValue' : hours}}]

    update_query = query(sql,sql_parameters)

    #Check to see if anything was updated
    if(update_query['numberOfRecordsUpdated'] == 0):
        return{
            'body': json.dumps("no defaults were updated"),
            'statusCode': 500
        }
    else:
        return{
            'body': json.dumps("default values updated"),
            'statusCode': 200
        }