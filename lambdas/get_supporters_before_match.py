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

    sql = "SELECT S.supporter_id, U.first_name, U.last_name, U.picture, S.rating, S.employer, S.title, AB.start_date, AB.end_date, ST.specialization, T.tags, SPS.job_search, SPS.grad_student, (select major from major where major_id = SMP.major_id)\
    FROM users U, supporters S, appointment_block AB, specializations_for_block SFB,\
    specialization_type ST, supporter_specializations SS, tags T, supporter_preferences_for_students SPS, supporter_major_preferences SMP\
    WHERE U.id = S.user_id\
    AND S.supporter_id = AB.supporter_id\
    AND T.supporter_id = S.supporter_id\
    AND SPS.supporter_id = S.supporter_id\
    AND SMP.supporter_id = S.supporter_id\
    AND AB.appointment_block_id = SFB.appointment_block_id\
    AND SFB.specialization_type_id = ST.specialization_type_id\
    AND ST.specialization_type_id = SS.specialization_type_id\
    AND S.supporter_id = SS.supporter_id\
    AND start_date BETWEEN '2020-04-17 00:01:00' AND '2020-04-19 11:59:00';"
            
    params = [{'name' : 'date_start', 'typeHint' : 'TIMESTAMP', 'value' : {'stringValue' : date_start}}, {'name' : 'date_end', 'typeHint' : 'TIMESTAMP', 'value' : {'stringValue' : date_end}}]

    query_data = query(sql, params)
    
    print(query_data['records'])

    if query_data['records'] == []: #If response was empty
        print("There are no appointment blocks available")
        return {
            "statusCode": 404
        }
    else:
        supporter_availibility = {}
    
        for entry in query_data['records']:
            print(len(entry))
            
            supporter_id = entry[0]['longValue']
            day = entry[7]['stringValue'][:10]
            
            if (supporter_id, day) in supporter_availibility:
                supporter = supporter_availibility[(supporter_id, day)]
                
                topics = supporter['topics']
                new_topic = entry[9]['stringValue']
                if new_topic not in topics:
                    topics.append(new_topic)
                    supporter['topics'] = topics
                
                supporter_prefs = supporter['preferences']
                major_prefs = supporter_prefs['major_prefs']
                new_major_pref = entry[13]['stringValue']
                if new_major_pref not in major_prefs:
                    major_prefs.append(new_major_pref)
                    supporter_prefs['major_prefs'] = major_prefs
                    supporter['preferences'] = supporter_prefs
                    
                supporter_availibility[(supporter_id, day)] = supporter
            
            else:
                supporter = {}
                
                
                supporter['supporter_id'] = entry[0]['longValue']
                supporter['name'] = entry[1]['stringValue'] + " " + entry[2]['stringValue']
                supporter['rating'] = entry[4]['longValue']
                supporter['employer'] = entry[5]['stringValue']
                supporter['title'] = entry[6]['stringValue']
                supporter['topics'] = [entry[9]['stringValue']]
                supporter['tags'] = entry[10]['stringValue'][1:-1].split(",")
                supporter['imgsrc'] = entry[3]['stringValue']
                supporter['timeBlocks'] = [{'start' : entry[7]['stringValue'][11:], 'end' : entry[8]['stringValue'][11:]}]
                supporter['day'] = entry[7]['stringValue'][:10]
                supporter['preferences'] = {'job_search' : entry[11]['booleanValue'], 'grad_student' : entry[12]['booleanValue'], 'major_prefs' : [entry[13]['stringValue']]}
            
                supporter_availibility[(supporter_id, day)] = supporter
            
    return {
        'statusCode' : 200,
        'body' : list(supporter_availibility.values())
    }