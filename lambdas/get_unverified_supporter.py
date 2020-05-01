import json
from package.query_db import query
from package.dictionary_to_list import dictionary_to_list
from package.lambda_exception import LambdaException


def get_unverified_supporters(event, context):
    sql_select ="""SELECT s.employer as s_employer, s.title as s_title, s.team_name as s_team_name, u.first_name as s_first_name, u.last_name as s_last_name, u.email as s_email, s.feedback as s_feedback, s.rating as s_rating, s.is_pending as s_is_pending, s.office as s_office, st.professional_staff as s_professional_staff, st.alumni as s_alumni, st.faculty as s_faculty, st.other as s_other, s.supporter_id as s_supporter_id, st.student_staff as s_student_staff\
                FROM supporters s, users u, supporter_type st \
                WHERE (s.is_pending = true or s.is_pending is NULL) AND s.user_id = u.id AND s.supporter_id = st.supporter_id;"""

    sql_parameters = dictionary_to_list({})
    response = query(sql_select, sql_parameters)
    if response['records'] == []:
        raise LambdaException("404: there are no supporters") #Raising lambda exception if there are no supporters
    else:
        unverified_supporter_information = []
        for entry in response['records']: #This for loop will append corrresponding data for JSON object
            block = dict()
            block["s_employer"] = entry[0].get("stringValue")
            block["s_title"] = entry[1].get("stringValue")
            block["s_team_name"] = entry[2].get("stringValue")
            block["s_first_name"] = entry[3].get("stringValue")
            block["s_last_name"] = entry[4].get("stringValue")
            block["s_email"] = entry[5].get("stringValue")
            block["s_feedback"] = entry[6].get("booleanValue")
            block["s_rating"] = entry[7].get("doubleValue")
            block["s_is_pending"] = entry[8].get("booleanValue")
            block["s_office"] = entry[9].get("stringValue")
            block["s_professional_staff"] = entry[10].get("booleanValue")
            block["s_alumni"] = entry[11].get("booleanValue")
            block["s_faculty"] = entry[12].get("booleanValue")
            block["s_other"] = entry[13].get("booleanValue")
            block["s_supporter_id"] = entry[14].get("longValue")
            block["s_student_staff"] = entry[15].get("booleanValue")
            unverified_supporter_information.append(block)

        #Returns the query contents in JSON format
        return{ 
            'body': json.dumps(unverified_supporter_information),
            'statusCode': 200
        }
    
