import json
from package.query_db import query

#Written by Matt Hill
#Input: none
#Output: fields from the default table

def get_admin_defaults(event,context):

    sql = 'SELECT max_students_for_specialization, duration_for_specialization, hours_before_appointment_for_supporter, M.medium \
    FROM default_table, medium M\
    WHERE M.medium_id = default_table.medium_of_appt'
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
    block["max_students_for_specialization"] = default_query['records'][0][0]["longValue"]
    block["duration_for_specialization"] = default_query['records'][0][1]["longValue"]
    block["hours_before_appointment_for_supporter"] = default_query['records'][0][2]["longValue"]
    block["medium_of_appt"] = default_query['records'][0][3]["stringValue"]

    defaults.append(block)

    return{
        'body': defaults,
        'statusCode': 200
    }