import json
from package.query_db import query

#Written by Matt Hill
#Input: supporter_id
#Output: JSON object of current supporter appointments in the format: 
# "supporterFN", "supporterLN", "studentFN", "studentLN", "type", "duration","method","location"

def get_appointment_supporter(event, context):

    given_id = event['supporter_id']
    sql = 'SELECT U1.first_name as supporterFN, U1.last_name as supporterLN, U2.first_name as studentFN, U2.last_name as studentLN, SA.type, SA.duration, SA.method, SA.location \
          FROM supporters S, users U1, users U2, student_appointment_relation SR, scheduled_appointments SA \
            WHERE S.supporter_id = SR.supporter_id and SR.appointment_id = SA.appointment_id and S.supporter_id = U1.id and SR.student_id = U2.id and S.supporter_id=:given_id;'
    
    sql_parameters = [{'name':'given_id', 'value' : {'longValue': given_id}}]
    appointment_info = query(sql, sql_parameters)
    
    #Check to see if the query even returned anything
    if (appointment_info['records'] == []): 
        return {
            'body': json.dumps("The supporter does not have any appointments or does not exist"),
            'statusCode': 404
        }
    else:
        supporter_appointments = []

        #For each entry in the query data, extracts relevant data and stores it in a dictionary with appropriate key
        for entry in appointment_info['records']: 
            block = dict()
            block["supporterFN"] = entry[0].get("stringValue")
            block["supporterLN"] = entry[1].get("stringValue")
            block["studentFN"] = entry[2].get("stringValue")
            block["studentLN"] = entry[3].get("stringValue")
            block["type"] = entry[4].get("stringValue")
            block["duration"] = entry[5].get("longValue")
            block["method"] = entry[6].get("stringValue")
            block["location"] = entry[7].get("stringValue")
            supporter_appointments.append(block)

        #Returns the query contents in JSON format
        return{
            'body': json.dumps(supporter_appointments), 
            'statusCode': 200
        }