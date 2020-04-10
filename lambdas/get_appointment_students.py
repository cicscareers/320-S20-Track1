import json
import boto3

#Input: supporter_id
#Output: JSON object of current appointments that a student has in the format: 
# "student first name", "student last name", "supporter first name", "supporter last name", "type", "duration","method","location"

def get_appointment_students(event, context):
    
    given_id = event['student_id']
    client = boto3.client('rds-data') #Connecting to the database
    appointment_info = client.execute_statement(
        secretArn = "arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database = "postgres",
        resourceArn = "arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql = "SELECT U1.first_name as studentFN, U1.last_name as studentLN, U2.first_name as supporterFN, U2.last_name as supporterLN, SA.type,SA.duration, SA.method, SA.location \
            FROM students S, users U1, users U2, student_appointment_relation SR, scheduled_appointments SA \
             WHERE S.student_id = SR.student_id and SR.appointment_id = SA.appointment_id and S.student_id = U1.id and SA.supporter_id = U2.id and S.student_id = '%s';" % (given_id)
    )

    if (appointment_info['records'] == []): 
        return{
            'body': json.dumps("The user does not exist or has no appointments"),
            'statusCode': 409
        }
    else:
        return{
            'body': json.dumps(appointment_info['records']), #outputs the query in JSON format
            'statusCode': 200
        }
    