import json
from package.query_db import query

#Written by Matt Hill
#Input: none
#Output: fields from the default table

def get_admin_defaults(event,context):

    sql = 'SELECT * FROM default'
    sql_parameters = []
    default_query = query(sql,sql_parameters)

    defaults = []

    block = dict()
    block["medium_of_appt"] = default_query['records'][0].get("stringValue")
    block["max_students_for_specialization"] = default_query['records'][1].get("stringValue")
    block["duration_for_specialization"] = default_query['records'][2].get("stringValue")
    block["hours_before_appointment_for_supporter"] = default_query['records'][3].get("stringValue")

    defaults.append(block)

    return{
        'body': defaults,
        'statusCode': 200
    }