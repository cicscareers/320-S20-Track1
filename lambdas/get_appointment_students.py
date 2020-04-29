import json
from package.query_db import query

#Written by Matt Hill
#Input: student_id
#Output: JSON object of current appointments that a student has in the format: 
# "studentFN","studentLN","studentPic","supporterFN","supporterLN","supporterPic","time_of_appt","time_scheduled","medium","cancelled","cancel_reason","location","feedback","rating","comment","promoter_score","max_students","duration","specialization_type"

def get_appointment_students(event, context):
    
    given_id = int(event['student_id'])

    #Check to see if the student user exists
    sql = 'SELECT student_id FROM students WHERE student_id=:given_id'
    sql_parameters = [{'name':'given_id', 'value' : {'longValue': given_id}}]
    exists = query(sql,sql_parameters)

    if(exists['records'] == []):
        return{
            'body': json.dumps("The user does not exist"),
            'statusCode': 404
        }

    #The user does exist, so fetch appointments
    sql = 'SELECT U1.first_name AS studentFN, U1.last_name AS studentLN, U1.picture AS studentPic, U2.first_name AS supporterFN, U2.last_name AS supporterLN, U2.picture AS supporterPic, SA.time_of_appt, SA.time_scheduled, SA.medium,SA.cancelled, SA.cancel_reason,SA.location, SR.feedback, SR.rating, SR.comment, SR.promoter_score, SS.max_students, SS.duration, ST.specialization_type \
            FROM students S, users U1, users U2, student_appointment_relation SR, scheduled_appointments SA, supporter_specializations SS, specialization_type ST \
             WHERE S.student_id = SR.student_id AND SR.appointment_id = SA.appointment_id AND S.student_id = U1.id AND SA.supporter_id = U2.id AND SA.supporter_id = SS.supporter_id AND ST.specialization_type_id = SS.specialization_type_id AND S.student_id=:given_id' 
    sql_parameters = [{'name':'given_id', 'value' : {'longValue': given_id}}]
    appointment_info = query(sql, sql_parameters)

    #Check to see if the query even returned anything
    if (appointment_info['records'] == []): 
        return{
            'body': json.dumps("The user has no appointments"),
            'statusCode': 404
        }
    else:
        student_appointments = []

        #For each entry in the query data, extracts relevant data and stores it in a dictionary with appropriate key
        for entry in appointment_info['records']: 
            block = dict()
            block["studentFN"] = entry[0].get("stringValue")
            block["studentLN"] = entry[1].get("stringValue")
            block["studentPic"] = entry[2].get("stringValue")
            block["supporterFN"] = entry[3].get("stringValue")
            block["supporterLN"] = entry[4].get("stringValue")
            block["supporterPic"] = entry[5].get("stringValue")
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


            student_appointments.append(block)

        #Returns the query contents in JSON format
        return{
            'body': student_appointments,
            'statusCode': 200
        }