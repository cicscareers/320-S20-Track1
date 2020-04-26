import json
from package.query_db import query

#Written by Matt Hill
#Input: supporter_id
#Output: JSON object of current supporter appointments in the format: 
# "supporterFN","supporterLN","studentFN","studentLN","supporterPic","time_of_appt","type","duration","method","location","comment","feedback","rating"

def get_appointment_supporter(event, context):

    given_id = int(event['supporter_id'])

    #Check to see if the ssupporter exists
    sql = 'SELECT supporter_id FROM supporters WHERE supporter_id=:given_id'
    sql_parameters = [{'name':'given_id', 'value' : {'longValue': given_id}}]
    exists = query(sql,sql_parameters)

    if(exists['records'] == []):
        return{
            'body': json.dumps("The user does not exist"),
            'statusCode': 404
        }

    #The user does exist, so fetch appointments
    sql = 'SELECT U1.first_name AS supporterFN, U1.last_name AS supporterLN, U2.first_name AS studentFN, U2.last_name AS studentLN, U1.picture, SA.time_of_appt, SA.type, SA.duration, SA.method, SA.location, SR.comment, SR.feedback, SR.rating \
          FROM supporters S, users U1, users U2, student_appointment_relation SR, scheduled_appointments SA \
            WHERE S.supporter_id = SR.supporter_id AND SR.appointment_id = SA.appointment_id AND S.supporter_id = U1.id AND SR.student_id = U2.id AND S.supporter_id=:given_id;'
    
    sql_parameters = [{'name':'given_id', 'value' : {'longValue': given_id}}]
    appointment_info = query(sql, sql_parameters)
    
    #Check to see if the query even returned anything
    if (appointment_info['records'] == []): 
        return {
            'body': json.dumps("The supporter has no appointments"),
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
            block["supporterPic"] = entry[4].get("stringValue")
            block["time_scheduled"] = entry[5].get("stringValue")
            block["type"] = entry[6].get("stringValue")
            block["duration"] = entry[7].get("longValue")
            block["method"] = entry[8].get("stringValue")
            block["location"] = entry[9].get("stringValue")
            block["comment"] = entry[10].get("stringValue")
            block["feedback"] = entry[11].get("stringValue")
            block["rating"] = entry[12].get("longValue")
            supporter_appointments.append(block)

        #Returns the query contents in JSON format
        return{
            'body': supporter_appointments, 
            'statusCode': 200
        }