import json
import boto3

#Input: supporter_id
#Output: JSON object of current supporter appointments
def get_appointment_supporter(event, context):

    given_id = event['supporter_id']
    client = boto3.client('rds-data') #Connecting to the database
    appointment_info = client.execute_statement(
        secretArn = "arn:aws:secretsmanager:us-east-2:500514381816:secret:rds-db-credentials/cluster-33FXTTBJUA6VTIJBXQWHEGXQRE/postgres-3QyWu7",
        database = "postgres",
        resourceArn = "arn:aws:rds:us-east-2:500514381816:cluster:postgres",
        sql = "SELECT U1.first_name as supporterFN, U1.last_name as supporterLN, U2.first_name as studentFN, U2.last_name as studentLN, SA.type, SA.duration, SA.method, SA.location \
            FROM supporters S, users U1, users U2, student_appointment_relation SR, scheduled_appointments SA \
             WHERE S.supporter_id = SR.supporter_id and SR.appointment_id = SA.appointment_id and S.supporter_id = U1.id and SR.student_id = U2.id and S.supporter_id = '%s';" % (given_id)
    )
    
    if (appointment_info['records'] == []): 
        return {
            'body': ("The supporter does not have any appointments"),
            'statusCode': 404
        }
    else:
        return{
            'body': json.dumps(appointment_info['records']), #outputs the query in JSON format
            'statusCode': 200
        }