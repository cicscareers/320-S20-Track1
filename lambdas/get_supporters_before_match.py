import json
import boto3
import copy

from package.query_db import query
from datetime import datetime
from datetime import timedelta

#Creates a dictionary of scheduled appointments in the form of:
#Key: (supporter_id, day)
#Value: List of {start, end} datetime objects sorted by starttime
def generate_scheduled_appt_dict():
    taken_days = {}

    date_format = "%Y-%m-%d %H:%M:%S"

    scheduled_sql = "SELECT supporter_id, time_of_appt, duration\
    FROM scheduled_appointments\
    WHERE NOT cancelled\
    AND time_of_appt BETWEEN :date_start AND :date_end;"

    params = [{'name' : 'date_start', 'typeHint' : 'TIMESTAMP', 'value' : {'stringValue' : date_start}}, {'name' : 'date_end', 'typeHint' : 'TIMESTAMP', 'value' : {'stringValue' : date_end}}]

    scheduled_query_data = query(scheduled_sql, params)

    for entry in scheduled_query_data['records']:
        start_datetime = datetime.strptime(entry[1]['stringValue'], date_format)
        end_datetime = start_datetime + timedelta(minutes=entry[2]['longValue'])
        supp_id = entry[0]['longValue']
        day = start_datetime.date()

        if (supp_id, day) in taken_days:
            taken_days[(supp_id, day)].append([start_datetime, end_datetime])
        else:
            taken_days[(supp_id, day)] = [[start_datetime, end_datetime]]

    for day in taken_days.values():
        day.sort(key=lambda day: day[0])

    return taken_days

#Create a list of objects representing supporter blocks with all supported topics and all scheduled times excluded
#Available block: {
#    supp_id,
#    name,
#    rating,
#    employer,
#    title,
#    location,
#    medium,
#    linkedin,
#    topics,
#    tags,
#    imgsrc,
#    timeBlocks,
#    day,
#    preference
#}
def generate_appt_blocks(scheduled_appts):

#Break up available blocks into chunked blocks with one topic each where available times are broken up into segments of that topic duration
def chunk_blocks(available_blocks):

    def break_block(start, end, duration):
        currBegin = start
        currEnd = start + duration
        while currEnd < end:
            yield [currBegin, currEnd]
            currBegin += duration
            currEnd += duration

    broken_blocks = []
    #hardcoded duration for now
    duration = 30

    for entry in available_blocks:
        for topic in entry['topics']:
            tmp_block = copy.deepcopy(entry)
            tmp_block['topics'] = topic
            tmp_block['timeBlocks'] = []
            for block in entry['timeBlocks']:
                for result in break_block(block[0], block[1], timedelta(minutes = duration)):
                    tmp_block['timeBlocks'].append(result)
            
            broken_blocks.append(tmp_block)

    return broken_blocks

# This lambda fetches a JSON list of available appointments blocks from the database. 
# the list is then filtered down by the front end. 
# Input: start_date, end_date
# Output: JSON object containing all possible appointments within given start and end date as well as the supporter information of the host
def get_supporters_before_match(event, context):
    
    date_start = event['start_date']
    date_end = event['end_date']

    date_format = "%Y-%m-%d %H:%M:%S"

    blocks_sql = "SELECT S.supporter_id, U.first_name, U.last_name, U.picture, S.rating, S.employer, S.title, AB.start_date, AB.end_date, ST.specialization_type, T.tags, SPS.job_search, SPS.grad_student, (select major from major where major_id = SMP.major_id), AB.max_num_of_appts\
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
    AND start_date BETWEEN :date_start AND :date_end;"

    scheduled_sql = "SELECT supporter_id, time_of_appt, duration\
    FROM scheduled_appointments\
    WHERE NOT cancelled\
    AND time_of_appt BETWEEN :date_start AND :date_end;"
            
    params = [{'name' : 'date_start', 'typeHint' : 'TIMESTAMP', 'value' : {'stringValue' : date_start}}, {'name' : 'date_end', 'typeHint' : 'TIMESTAMP', 'value' : {'stringValue' : date_end}}]

    blocks_query_data = query(blocks_sql, params)

    scheduled_query_data = query(scheduled_sql, params)

    if blocks_query_data['records'] == []: #If response was empty
        print("There are no appointment blocks available")
        return {
            "statusCode": 404
        }
    else:
        supporter_availibility = {}
    
        for entry in blocks_query_data['records']:

            if len(entry) != 15:
                return {
                    "statusCode": 422
                }

            scheduled_in = 0
            entry_start_date = datetime.strptime(entry[7]['stringValue'], date_format)
            entry_end_date = datetime.strptime(entry[8]['stringValue'], date_format)

            for appt in scheduled_query_data['records']:
                appt_start_date = datetime.strptime(appt[1]['stringValue'], date_format)
                appt_end_date = appt_start_date + timedelta(minutes=appt[2]['longValue'])
                if appt[0]['longValue'] == entry[0]['longValue'] and entry_start_date < appt_start_date < appt_end_date < entry_end_date:
                    scheduled_in = scheduled_in + 1
            
            if scheduled_in >= entry[14]['longValue']:
                continue
            
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
                supporter['tags'] = entry[10]['arrayValue']['stringValues']
                supporter['imgsrc'] = entry[3]['stringValue']
                supporter['timeBlocks'] = [{'start' : entry[7]['stringValue'][11:], 'end' : entry[8]['stringValue'][11:]}]
                supporter['day'] = entry[7]['stringValue'][:10]
                supporter['preferences'] = {'job_search' : entry[11]['booleanValue'], 'grad_student' : entry[12]['booleanValue'], 'major_prefs' : [entry[13]['stringValue']]}
            
                supporter_availibility[(supporter_id, day)] = supporter
            
    return {
        'statusCode' : 200,
        'body' : list(supporter_availibility.values())
    }