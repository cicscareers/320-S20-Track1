import json
from package.query_db import query

#Written by Matt Hill
#Input: none
#Output: fields from the default table

def get_admin_defaults(event,context):

    sql = 'SELECT * FROM default_table'
    sql_parameters = []
    default_query = query(sql,sql_parameters)

    #Check if table is empty
    if(default_query['records'] == []):
        return{
            'body': json.dumps("default table empty"),
            'statusCode': 500
        }
    
    
    defaults = []

    block = dict()
    block["medium_of_appt"] = default_query['records'][0][0]["longValue"]
    block["max_students_for_specialization"] = default_query['records'][0][1]["longValue"]
    block["duration_for_specialization"] = default_query['records'][0][2]["longValue"]
    block["hours_before_appointment_for_supporter"] = default_query['records'][0][3]["longValue"]

    defaults.append(block)

    return{
        'body': defaults,
        'statusCode': 200
    }