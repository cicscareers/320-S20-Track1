import json
import boto3
import copy

from package.query_db import query
from package.lambda_exception import LambdaException
from datetime import datetime
from datetime import timedelta

DATE_FORMAT = "%Y-%m-%d"
TIME_FORMAT = "%H:%M:%S"
DATETIME_FORMAT = "%Y-%m-%d %H:%M:%S"

#Creates a dictionary of scheduled appointments in the form of:
#Key: (supporter_id, day)
#Value: List of [start, end] datetime objects sorted by starttime
def generate_scheduled_appt_dict(date_start, date_end):
    taken_days = {}

    scheduled_sql = "SELECT A.supporter_id, A.time_of_appt, SS.duration\
    FROM scheduled_appointments A, specializations_for_appointment SFA, specialization_type ST, supporter_specializations SS\
    WHERE A.appointment_id = SFA.appointment_id\
    AND SFA.specialization_type_id = ST.specialization_type_id\
    AND ST.specialization_type_id = SS.specialization_type_id\
    AND NOT cancelled\
    AND time_of_appt BETWEEN :date_start AND :date_end;"

    params = [{'name' : 'date_start', 'typeHint' : 'TIMESTAMP', 'value' : {'stringValue' : date_start}}, {'name' : 'date_end', 'typeHint' : 'TIMESTAMP', 'value' : {'stringValue' : date_end}}]

    scheduled_query_data = query(scheduled_sql, params)

    for entry in scheduled_query_data['records']:
        start_datetime = datetime.strptime(entry[1]['stringValue'], DATETIME_FORMAT)
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

def generate_supporter_dict():
    supporters = {}

    supporters_sql = "SELECT S.supporter_id, U.first_name, U.last_name, U.picture, S.rating, S.employer, S.title, S.office, (select link from user_link where user_id = U.id and link_id = (select link_id from link where link_type = 'LinkedIn')), (select tag_type from tag_type where tag_type_id = ST.tag_type_id), SPS.grad_student, SPS.hours_before_appointment, (select major from major where major_id = SMP.major_id), SS.max_students, SS.duration, (select specialization_type from specialization_type where specialization_type_id = SS.specialization_type_id), (select medium from medium where medium_id = SM.medium_id)\
    FROM users U, supporters S, supporter_tags ST, supporter_preferences_for_students SPS, supporter_major_preferences SMP, supporter_specializations SS, supporter_mediums SM\
    WHERE U.id = S.user_id\
    AND S.supporter_id = ST.supporter_id\
    AND S.supporter_id = SPS.supporter_id\
    AND SPS.supporter_id = SMP.supporter_id\
    AND S.supporter_id = SS.supporter_id\
    AND S.supporter_id = SM.supporter_id;"

    supporter_query = query(supporters_sql)

    for entry in supporter_query['records']:
        if entry[0]['longValue'] in supporters:
            supporter = supporters[entry[0]['longValue']]
            if entry[9]['stringValue'] not in supporter['tags']:
                supporter['tags'].append(entry[9]['stringValue'])
            if entry[12]['stringValue'] not in supporter['preferences']['major_prefs']:
                supporter['preferences']['major_prefs'].append(entry[12]['stringValue'])
            if entry[15]['stringValue'] not in supporter['topics']:
                new_topic = {'duration':entry[14]['longValue'], 'max_students': entry[13]['longValue']}
                supporter['topics'][entry[15]['stringValue']] = new_topic
            if entry[16]['stringValue'] not in supporter['mediums']:
                supporter['mediums'].append(entry[16]['stringValue'])
        else:
            new_supporter = {}
            new_supporter['supporter_id'] = entry[0]['longValue']
            if 'stringValue' in entry[1]:
                new_supporter['name'] = "%s %s"%(entry[1]['stringValue'], entry[2]['stringValue'])
            else:
                new_supporter['name'] = ""
            if 'stringValue' in entry[4]:
                new_supporter['rating'] = entry[4]['stringValue']
            else:
                new_supporter['rating'] = ""
            if 'stringValue' in entry[5]:
                new_supporter['employer'] = entry[5]['stringValue']
            else:
                new_supporter['employer'] = ""
            if 'stringValue' in entry[6]:
                new_supporter['title'] = entry[6]['stringValue']
            else:
                new_supporter['title'] = ""
            if 'stringValue' in entry[7]:
                new_supporter['office'] = entry[7]['stringValue']
            else:
                new_supporter['office'] = ""
            if 'stringValue' in entry[8]:
                new_supporter['LinkedIn'] = entry[8]['stringValue']
            else:
                new_supporter["LinkedIn"] = ""
            if 'stringValue' in entry[9]:
                new_supporter['tags'] = [entry[9]['stringValue']]
            else:
                new_supporter['tags'] = []
            if 'stringValue' in entry[5]:
                new_supporter['employer'] = entry[5]['stringValue']
            else:
                new_supporter['employer'] = ""
            if 'stringValue' in entry[3]:
                new_supporter['imgsrc'] = entry[3]['stringValue']
            else:
                new_supporter['imgsrc'] = ""
            new_supporter['topics'] = {entry[15]['stringValue']:{'duration':entry[14]['longValue'], 'max_students': entry[13]['longValue']}}
            new_supporter['preferences'] = {'grad_student': entry[10]['booleanValue'], 'hours_before_appointment': entry[11]['longValue'], 'major_prefs': [entry[12]['stringValue']]}
            new_supporter['mediums'] = [entry[16]['stringValue']]

            supporters[entry[0]['longValue']] = new_supporter

    return supporters

def generate_block_dict(supporter_dict, scheduled_appointments, date_start, date_end):
    blocks = {}

    blocks_sql = "SELECT supporter_id, start_date, end_date, max_num_of_appts FROM appointment_block WHERE start_date BETWEEN :date_start AND :date_end;"

    params = [{'name' : 'date_start', 'typeHint' : 'TIMESTAMP', 'value' : {'stringValue' : date_start}}, {'name' : 'date_end', 'typeHint' : 'TIMESTAMP', 'value' : {'stringValue' : date_end}}]

    block_query = query(blocks_sql, params)

    for entry in block_query['records']:

        start_datetime = datetime.strptime(entry[1]['stringValue'], DATETIME_FORMAT)
        end_datetime = datetime.strptime(entry[2]['stringValue'], DATETIME_FORMAT)

        day = start_datetime.date()

        if (entry[0]['longValue'], day) in blocks:
            new_block = blocks[(entry[0]['longValue'], day)]
        else:
            # print(supporter_dict.keys())
            if entry[0]['longValue'] not in supporter_dict:
                continue
            new_block = copy.deepcopy(supporter_dict[entry[0]['longValue']])
            new_block['timeBlocks'] = []
            new_block['day'] = day.strftime(DATE_FORMAT)
            blocks[(entry[0]['longValue'], day)] = new_block
        
        if (new_block['supporter_id'], day) in scheduled_appointments:
            taken_times = scheduled_appointments[(new_block['supporter_id'], day)]
        else:
            taken_times = []

        available_times = []
        curr_latest_time = start_datetime

        for time in taken_times:
            if curr_latest_time <= time[0] < time[1] <= end_datetime:
                if curr_latest_time != time[0]:
                    available_times.append({'start': ceil_dt(curr_latest_time, timedelta(minutes=30)).strftime(TIME_FORMAT), 'end': ceil_dt(time[0], timedelta(minutes=30)).strftime(TIME_FORMAT)})
                curr_latest_time = time[1]
        
        if curr_latest_time != end_datetime:
            available_times.append({'start': ceil_dt(curr_latest_time, timedelta(minutes=30)).strftime(TIME_FORMAT), 'end': ceil_dt(end_datetime, timedelta(minutes=30)).strftime(TIME_FORMAT)})

        new_block['timeBlocks'].extend(available_times)

    block_values = blocks.values()

    for block in block_values:
        if block['timeBlocks'] == []:
            block_values.remove(block)
    
    # print(blocks)
    return block_values

def ceil_dt(dt, delta):
    return dt + (datetime.min - dt) % delta

def main(event, context):

    date_start = event['start_date']
    date_end = event['end_date']

    supporter_dict = generate_supporter_dict()

    scheduled_appointments = generate_scheduled_appt_dict(date_start, date_end)
    appointment_blocks = generate_block_dict(supporter_dict, scheduled_appointments, date_start, date_end)

    return {
        'statusCode' : 200,
        'body' : list(appointment_blocks)
    }