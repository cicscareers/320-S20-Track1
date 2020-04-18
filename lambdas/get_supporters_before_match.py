import json
import boto3

from package.query_db import query

# This lambda fetches a JSON list of available appointments blocks from the database. 
# the list is then filtered down by the front end. 
# Input: start_date, end_date
# Output: JSON object containing all possible appointments within given start and end date as well as the supporter information of the host
def get_supporters_before_match(event, context):
    
    date_start = event['start_date']
    date_end = event['end_date']
    
    sql = "SELECT S.supporter_id, U.first_name, U.last_name, U.picture, S.rating, S.employer, S.title, AB.start_date, AB.end_date, ST.specialization\
            FROM users U, supporters S, appointment_block AB, specializations_for_block SFB,\
            specialization_type ST, supporter_specializations SS\
            WHERE U.id = S.user_id\
            AND S.supporter_id = AB.supporter_id\
            AND AB.appointment_block_id = SFB.appointment_block_id\
            AND SFB.specialization_type_id = ST.specialization_type_id\
            AND ST.specialization_type_id = SS.specialization_type_id\
            AND S.supporter_id = SS.supporter_id\
            AND start_date BETWEEN :date_start AND :date_end\
            AND number_of_students != max_students;"
            
    params = [{'name' : 'date_start', 'typeHint' : 'TIMESTAMP', 'value' : {'stringValue' : date_start}}, {'name' : 'date_end', 'typeHint' : 'TIMESTAMP', 'value' : {'stringValue' : date_end}}]

    query_data = query(sql, params)

    if query_data['records'] == []: #If response was empty
        print("There are no appointment blocks available")
        return {
            "statusCode": 404
        }
    else:
        appointmentDict = dict()

        #For each entry in the query data, extracts relevant data and stores it in a dictionary with appropriate key
        for entry in query_data['records']: 
            if(entry[6].get("stringValue")[0:10] in appointmentDict):
                block = appointmentDict[entry[6].get("stringValue")]
                time = dict()
                time["start"] = entry[6].get("stringValue")[11:19]
                time["end"] = entry[7].get("stringValue")[11:19]
                block[time].append(time)
            else:
                block = dict()
                block["supporter_id"] = entry[0].get("longValue")
                block["name"] = "%s %s" %(entry[1].get("stringValue"), entry[2].get("stringValue"))
                block["picture"] = entry[3].get("stringValue")
                block["rating"] = entry[4].get("longValue")
                block["employer"] = entry[5].get("stringValue")
                block["title"] = entry[6].get("stringValue")
                block["topics"] = [entry[8].get("stringValue")]
                time = dict()
                time["start"] = entry[6].get("stringValue")[11:19]
                time["end"] = entry[7].get("stringValue")[11:19]
                block["timeBlocks"] = [time]
                block["day"] = entry[6].get("stringValue")[0:10]
                appointmentDict.add(block["day"], block)

            

        return{
            'statusCode': 200,
            'body': json.dumps(appointments) #Outputs the appointment list in JSON format 
        }


