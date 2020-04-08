import json
import boto3
import constants

#Input: supporter_id
#Output: JSON object of current supporter appointments
def get_appointment_students(event, context):
    # TODO implement
    
    given_id = event['student_id']
    client = boto3.client('rds-data') #Connecting to the database
    appointment_info = client.execute_statement(
        secretArn = constants.SECRET_ARN,
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "SELECT A.appointment_id, A.supporter_id, A.time, A.type, A.duration, A.method, A.cancelled, A.cancel_reason, A.location FROM students S, student_appointment_relation R, scheduled_appointments A \
             WHERE S.student_id = R.student_id and R.appointment_id = A.appointment_id and A.student_id = '%s';" % (given_id)
    )

    if appointment_info['records'] == '': 
        print("The user has no appointments")
        return {
            'statusCode': 404
        }
    else:
        return{
            'statusCode': 200,
            'body': json.dumps(appointment_info['records']) #outputs the query in JSON format
        }
    