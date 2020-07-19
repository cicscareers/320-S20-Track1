import boto3

from package.query_db import query
from package.lambda_exception import LambdaException
from package.s3_utils import get_image
from datetime import datetime, date, timedelta

DATETIME_FORMAT = "%Y-%m-%d %H:%M:%S"

# Returns a list of already scheduled appointments.
def get_scheduled_appointments(start_datetime, end_datetime):
    sql = "SELECT A.supporter_id, A.time_of_appt, SS.duration\
        FROM scheduled_appointments A, specializations_for_appointment SFA, specialization_type ST, supporter_specializations SS\
        WHERE A.appointment_id = SFA.appointment_id\
        AND SFA.specialization_type_id = ST.specialization_type_id\
        AND NOT cancelled\
        AND time_of_appt BETWEEN :start_datetime AND :end_datetime"
    
    params = [
        {'name': 'start_datetime', 'typeHint': 'TIMESTAMP', 'value': {'stringValue': start_datetime}},
        {'name': 'end_datetime', 'typeHint': 'TIMESTAMP', 'value': {'stringValue': end_datetime}}
    ]

    sql_result = query(sql, params)['records']

    scheduled_appointments = {}

    for record in sql_result:
        start_datetime = datetime.strptime(record[1]['stringValue'], DATETIME_FORMAT)
        end_datetime = start_datetime + timedelta(minutes=record[2]['longValue'])

        supporter_id = record[0]['longValue']

        if supporter_id in scheduled_appointments:
            scheduled_appointments[supporter_id].append((start_datetime, end_datetime))
        else:
            scheduled_appointments[supporter_id] = [(start_datetime, end_datetime)]
        
    # Sort taken appointments by start time.
    for scheduled_appointments_supporter in scheduled_appointments.values():
        scheduled_appointments_supporter.sort(key = lambda start_datetime: start_datetime[0])
    
    return scheduled_appointments

# Fills supporter profile information in the dictionary.
def fill_supporter_information(available_supporters):
    supporters = ["NULL"]
    for supporter in available_supporters.keys():
        supporters.append(str(supporter))

    sql = f"""SELECT S.supporter_id, U.preferred_name, U.first_name, U.last_name, S.rating, S.employer, S.title, S.office, (SELECT link FROM user_link WHERE user_id = U.id AND link_id = (SELECT link_id FROM link WHERE link_type = 'LinkedIn')), (SELECT tag_type FROM tag_type WHERE tag_type_id = ST.tag_type_id), SPS.grad_student, SPS.hours_before_appointment, (SELECT major FROM major WHERE major_id = SMP.major_id), SS.max_students, SS.duration, (SELECT specialization_type FROM specialization_type WHERE specialization_type_id = SS.specialization_type_id), (SELECT medium FROM medium where medium_id = SM.medium_id)
    FROM users U, supporters S, supporter_tags ST, supporter_preferences_for_students SPS, supporter_major_preferences SMP, supporter_specializations SS, supporter_mediums SM
    WHERE U.id IN({",".join(supporters)})
    AND U.id = S.user_id
    AND S.supporter_id = ST.supporter_id
    AND S.supporter_id = SPS.supporter_id
    AND SPS.supporter_id = SMP.supporter_id
    AND S.supporter_id = SS.supporter_id
    AND S.supporter_id = SM.supporter_id"""
    
    sql_result = query(sql)['records']
    
    # Supporters for which basic common information is filled.
    partial_filled_supporters = []

    for record in sql_result:
        supporter_id = record[0]['longValue']

        if supporter_id not in partial_filled_supporters:
            available_supporters[supporter_id]['supporter_id'] = supporter_id

            if 'stringValue' in record[1] and record[1]['stringValue'].strip() != "":
                available_supporters[supporter_id]['name'] = record[1]['stringValue']
            else:
                available_supporters[supporter_id]['name'] = f"{record[2]['stringValue']} {record[3]['stringValue']}"
            
            available_supporters[supporter_id]['rating'] = record[4]['stringValue'] if 'stringValue' in record[4] else ""
            available_supporters[supporter_id]['employer'] = record[5]['stringValue'] if 'stringValue' in record[5] else ""
            available_supporters[supporter_id]['title'] = record[6]['stringValue'] if 'stringValue' in record[6] else ""
            available_supporters[supporter_id]['office'] = record[7]['stringValue'] if 'stringValue' in record[7] else ""
            available_supporters[supporter_id]['LinkedIn'] = record[8]['stringValue'] if 'stringValue' in record[8] else ""
            available_supporters[supporter_id]['imgsrc'] = get_image(f"profile/{supporter_id}/image")
        
            if 'stringValue' in record[9]:
                available_supporters[supporter_id]['tags'] = [record[9]['stringValue']]
            else:
                available_supporters[supporter_id]['tags'] = []
    
            available_supporters[supporter_id]['preferences'] = {
                'grad_student': record[10]['booleanValue'],
                'hours_before_appointment': record[11]['longValue'],
                'major_prefs': [record[12]['stringValue']],
            }
            available_supporters[supporter_id]['tags'] = [record[9]['stringValue']] if 'stringValue' in record[9] else []
            available_supporters[supporter_id]['mediums'] = [record[16]['stringValue']]
            available_supporters[supporter_id]['topics'] = {
                record[15]['stringValue']: {
                    'duration': record[14]['longValue'],
                    'max_students': record[13]['longValue']
                }
            }

            partial_filled_supporters.append(supporter_id)
        else:
            if record[9]['stringValue'] not in available_supporters[supporter_id]['tags']:
                available_supporters[supporter_id]['tags'].append(record[9]['stringValue'])
            
            if record[12]['stringValue'] not in available_supporters[supporter_id]['preferences']['major_prefs']:
                available_supporters[supporter_id]['preferences']['major_prefs'].append(record[12]['stringValue'])
            
            if record[15]['stringValue'] not in available_supporters[supporter_id]['topics']:
                topic = {
                    'duration': record[14]['longValue'],
                    'max_students': record[13]['longValue']
                }
                available_supporters[supporter_id]['topics'][record[15]['stringValue']] = topic
            
            if record[16]['stringValue'] not in available_supporters[supporter_id]['mediums']:
                available_supporters[supporter_id]['mediums'].append(record[16]['stringValue'])

# Gets a dictionary with all available appointments by supporter.
def get_available_appointments(start_datetime, end_datetime, scheduled_appointments):
    appointment_blocks = {}

    sql = "SELECT supporter_id, start_date, end_date FROM appointment_block WHERE start_date BETWEEN :start_datetime AND :end_datetime"

    params = [
        {'name': 'start_datetime', 'typeHint': 'TIMESTAMP', 'value': {'stringValue': start_datetime}},
        {'name': 'end_datetime', 'typeHint': 'TIMESTAMP', 'value': {'stringValue': end_datetime}}
    ]

    sql_result = query(sql, params)['records']

    for record in sql_result:
        supporter_id = record[0]['longValue']
        if supporter_id not in appointment_blocks:
            appointment_blocks[supporter_id] = {}
            appointment_blocks[supporter_id]['timeBlocks'] = []

        start_datetime = datetime.strptime(record[1]['stringValue'], DATETIME_FORMAT)
        end_datetime = datetime.strptime(record[2]['stringValue'], DATETIME_FORMAT)

        # Add appointment if it isn't already used.
        time_counter = start_datetime
        if supporter_id in scheduled_appointments:
            for scheduled_appointment in scheduled_appointments[supporter_id]:
                if time_counter <= scheduled_appointment[0] < scheduled_appointment[1] <= end_datetime:
                    if time_counter != scheduled_appointment[0]:
                        appointment_blocks[supporter_id]['timeBlocks'].append({
                            'start': ceil_dt(time_counter, timedelta(minutes=30)).strftime(DATETIME_FORMAT),
                            'end': ceil_dt(scheduled_appointment[0], timedelta(minutes=30)).strftime(DATETIME_FORMAT)
                        })
                    time_counter = scheduled_appointment[1]
        
        if time_counter != end_datetime:
            appointment_blocks[supporter_id]['timeBlocks'].append({
                        'start': ceil_dt(time_counter, timedelta(minutes=30)).strftime(DATETIME_FORMAT),
                        'end': ceil_dt(end_datetime, timedelta(minutes=30)).strftime(DATETIME_FORMAT)
                    })
    
    for supporter__id in appointment_blocks:
        if(appointment_blocks[supporter__id] == []):
            appointment_blocks.pop(supporter__id)
    
    return appointment_blocks

# Rounds the time to the next multiple of delta.
def ceil_dt(dt, delta):
    return dt + (datetime.min - dt) % delta

def main(event, context):
    today = date.today()
    start_datetime = event['start_date']
    if (datetime.strptime(start_datetime, DATETIME_FORMAT).date() < today) :
        start_datetime = today.strftime(DATETIME_FORMAT)

    end_datetime = event['end_date']

    scheduled_appointments = get_scheduled_appointments(start_datetime, end_datetime)
    available_supporters = get_available_appointments(start_datetime, end_datetime, scheduled_appointments)
    fill_supporter_information(available_supporters)

    return {
        'statusCode': 200,
        'body': list(available_supporters.values())
    }