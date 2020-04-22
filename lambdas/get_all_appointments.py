import json
from package.query_db import query

#Written by Matt Hill
#Input: 
#Output: JSON object of current supporter appointments in the format: 
# "supporterFN","supporterLN","supporterPic", "studentFN","studentLN","studentPic","time_of_appt","type","duration","method","location","comment", "feedback","rating","promoter_score"

def get_all_appointments(event, context):

    #Check to see if their are any appointments scheduled
    sql = 'SELECT appointment_id FROM scheduled_appointments'
    sql_parameters = []
    exists = query(sql,sql_parameters)

    if(exists['records'] == []):
        return{
            'body': json.dumps("There are no appointments scheduled"),
            'statusCode': 404
        }
    else:
        #There are appointments scheduled, so fetch appointments
        sql = 'SELECT U1.first_name AS supporterFN, U1.last_name AS supporterLN, U1.picture AS supporterPic, U2.first_name AS studentFN, U2.last_name AS studentLN, U2.picture AS studentPic, SA.time_of_appt, SA.type, SA.duration, SA.method, SA.location, SR.comment, S.feedback, S.rating, SR.promoter_score \
          FROM supporters S, users U1, users U2, student_appointment_relation SR, scheduled_appointments SA \
            WHERE S.supporter_id = SR.supporter_id AND SR.appointment_id = SA.appointment_id AND S.supporter_id = U1.id AND SR.student_id = U2.id'
    
        sql_parameters = []
        appointment_info = query(sql, sql_parameters)
    
        appointments = []

        #For each entry in the query data, extracts relevant data and stores it in a dictionary with appropriate key
        for entry in appointment_info['records']: 
            block = dict()
            block["supporterFN"] = entry[0].get("stringValue")
            block["supporterLN"] = entry[1].get("stringValue")
            block["supporterPic"] = entry[2].get("stringValue")
            block["studentFN"] = entry[3].get("stringValue")
            block["studentLN"] = entry[4].get("stringValue")
            block["studentPic"] = entry[5].get("stringValue")
            block["time_scheduled"] = entry[6].get("stringValue")
            block["type"] = entry[7].get("stringValue")
            block["duration"] = entry[8].get("longValue")
            block["method"] = entry[9].get("stringValue")
            block["location"] = entry[10].get("stringValue")
            block["comment"] = entry[11].get("stringValue")
            block["feedback"] = entry[12].get("booleanValue")
            block["rating"] = entry[13].get("longValue")
            block["promoter_score"] = entry[14].get("booleanValue")
            appointments.append(block)

        #Returns the query contents
        return{
            'body': appointments, 
            'statusCode': 200
        }