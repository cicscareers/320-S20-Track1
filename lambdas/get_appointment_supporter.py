import json
from package.query_db import query

#Written by Matt Hill
#Input: supporter_id
#Output: JSON object of current supporter appointments in the format: 
# "supporterFN","supporterLN","supporterPic", "studentFN","studentLN","studentPic","time_of_appt","time_scheduled","medium","cancelled","cancel_reason","location","feedback","rating","comment","promoter_score","max_studnets","duration","specialization_type","appointment_id"

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
     sql = 'SELECT distinct U1.first_name AS supporterFN, U1.last_name AS supporterLN, U1.picture AS supporterPic, U2.first_name AS studentFN, U2.last_name AS studentLN, U2.picture as studentPic, SA.time_of_appt, SA.time_scheduled, SA.medium,SA.cancelled, SA.cancel_reason,SA.location, SR.feedback, SR.rating, SR.comment, SR.promoter_score, SS.max_students, SS.duration, ST.specialization_type, SR.appointment_id \
          FROM supporters S, users U1, users U2, student_appointment_relation SR, scheduled_appointments SA, supporter_specializations SS, specializations_for_appointment SF, specialization_type ST \
            WHERE S.supporter_id = SR.supporter_id \
            AND SR.appointment_id = SA.appointment_id \
            AND S.supporter_id = U1.id \
            AND SR.student_id = U2.id \
            AND SA.appointment_id = SF.appointment_id \
            AND SF.appointment_id = ST.specialization_type_id \
            AND ST.specialization_type_id = SS.specialization_type_id \
            AND S.supporter_id=:given_id;'
    
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
            block["supporterPic"] = entry[2].get("stringValue")
            block["studentFN"] = entry[3].get("stringValue")
            block["studentLN"] = entry[4].get("stringValue")
            block["studentPic"] = entry[5].get("stringValue")
            block["time_of_appt"] = entry[6].get("stringValue")
            block["time_scheduled"] = entry[7].get("stringValue")
            block["medium"] = entry[8].get("stringValue")
            block["cancelled"] = entry[9].get("booleanValue")
            block["cancel_reason"] = entry[10].get("stringValue")
            block["location"] = entry[11].get("stringValue")
            block["feedback"] = entry[12].get("stringValue")
            block["rating"] = entry[13].get("longValue")
            block["comment"] = entry[14].get("stringValue")
            block["promoter_score"] = entry[15].get("booleanValue")
            block["max_students"] = entry[16].get("longValue")
            block["duration"] = entry[17].get("longValue")
            block["specialization_type"] = entry[18].get("stringValue")
            block["supporter_id"] = entry[19].get("long")
            supporter_appointments.append(block)

        #Returns the query contents in JSON format
        return{
            'body': supporter_appointments, 
            'statusCode': 200
        }