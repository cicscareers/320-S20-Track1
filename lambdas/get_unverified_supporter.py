import json
from package.query_db import query
from package.dictionary_to_list import dictionary_to_list

def get_unverified_supporters(event, context):
    sql_parameter_dic = {}
    sql_parameter_dic["val"] = 'true'
    sql_select ="""SELECT s.employer as s_employer, s.title as s_title, s.team_name as s_team_name, u.first_name as s_first_name, u.last_name as s_last_name, u.email as s_email \
                FROM supporters s, users u \
                WHERE (s.is_pending = true or s.is_pending is NULL) AND s.user_id = u.id;"""

    sql_parameters = dictionary_to_list(sql_parameter_dic)
    response = query(sql_select, sql_parameters)
    if response['records'] == []:
        print("No supporters")
        return{
            'statusCode': 404
        }
    else:
        unverified_supporter_information = []
        for entry in response['records']:
            block = dict()
            block["s_employer"] = entry[0].get("stringValue")
            block["s_title"] = entry[1].get("stringValue")
            block["s_team_name"] = entry[2].get("stringValue")
            block["s_first_name"] = entry[3].get("stringValue")
            block["s_last_name"] = entry[4].get("stringValue")
            block["s_email"] = entry[5].get("stringValue")
            unverified_supporter_information.append(block)

    #Returns the query contents in JSON format
        return{
            'body': json.dumps(unverified_supporter_information),
            'statusCode': 200
        }
    
