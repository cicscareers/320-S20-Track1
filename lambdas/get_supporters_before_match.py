import json
import boto3

# This lambda fetches a JSON list of available appointments blocks from the database. 
# the list is then filtered down by the front end. 
# Input: start_date, end_date
# Output: JSON object containing all possible appointments within given start and end date as well as the supporter information of the host
def get_supporters_before_match(event, context):
    
    date_start = event['start_date'] #Getting beginning of time to search from event
    date_end = event['end_date'] #Getting end of time to search from event

    client = boto3.client('rds-data') #Connecting to the database
    query_data = client.execute_statement( #Performing query
        secretArn = "arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database = "postgres",
        resourceArn = "arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql = "SELECT U.first_name, U.last_name, U.picture, S.rating, AB.start_date, AB.end_date, ST.specialization, SS.duration, AB.number_of_students, SS.max_students\
                FROM users U, supporters S, appointment_block AB, specializations_for_block SFB,\
                specialization_type ST, supporter_specializations SS\
                WHERE U.id = S.user_id\
                AND S.supporter_id = AB.supporter_id\
                AND AB.appointment_block_id = SFB.appointment_block_id\
                AND SFB.specialization_type_id = ST.specialization_type_id\
                AND ST.specialization_type_id = SS.specialization_type_id\
                AND S.supporter_id = SS.supporter_id\
                AND start_date BETWEEN %s AND %s\
                AND number_of_students != max_students;"%(date_start, date_end)
    )

    if query_data['records'] == []: #If response was empty
        print("There are no appointment blocks available")
        return {
            "statusCode": 404
        }
    else:
        appointments = []

        #For each entry in the query data, extracts relevant data and stores it in a dictionary with appropriate key
        for entry in query_data['records']: 
            block = dict()
            block["fname"] = entry[0].get("stringValue")
            block["lname"] = entry[1].get("stringValue")
            block["picture"] = entry[2].get("stringValue")
            block["rating"] = entry[3].get("longValue")
            block["start_time"] = entry[4].get("stringValue")
            block["end_time"] = entry[5].get("stringValue")
            block["type"] = entry[6].get("stringValue")
            block["duration"] = entry[7].get("longValue")
            block["number_of_students"] = entry[8].get("longValue")
            block["max_students"] = entry[9].get("longValue")
            appointments.append(block)

        return{
            'statusCode': 200,
            'body': json.dumps(appointments) #Outputs the appointment list in JSON format 
        }

