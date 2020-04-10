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
    appointment_info = client.execute_statement(
        secretArn = "arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database = "postgres",
        resourceArn = "arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql = "SELECT U.first_name, U.last_name, U.picture, S.rating, AB.start_date, AB.end_date, ST.specialization, SS.duration, AB.number_of_students, SS.max_students\
                FROM users U, supporters S, appointment_block AB, specializations_for_block SFB,\
                specialization_type ST, supporter_specializations SS\
                WHERE U.id = S.user_id\
                AND supporters.supporter_id\
                AND AB.appointment_block_id = SFB.appointment_block_id\
                AND SFB.specialization_type_id = ST.specialization_type_id\
                AND ST.specialization_type_id = SS.specialization_type_id\
                AND start_date BETWEEN " + date_start + " AND " + date_end + "\
                AND number_of_students != max_students;"
    )

    if appointment_info['records'] == []: 
        print("There are no appointment blocks available")
        return {
            "statusCode": 404
        }
    else:
        return{
            'statusCode': 200,
            'body': json.dumps(appointment_info['records']) #outputs the query in JSON format 
        }

