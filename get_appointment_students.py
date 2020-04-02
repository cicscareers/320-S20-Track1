import json
import boto3
import constants

#Input: supporter_id
#Output: JSON object of current supporter appointments
def get_appointment_students(event, context):
    # TODO implement

    student_id_want = event['student_id']
    client = boto3.client('rds-data') #Connecting to the database
    appointment_info = client.execute_statement(
        secretArn = constants.SECRET_ARN,
        database = constants.DB_NAME,
        resourceArn = constants.Arn,
        sql = 'SELECT U.first_name, U.last_name, S.student_id, APP.appointment_id, APP.time, APP.type, APP.duration, APP.method, APP.location FROM users U, students S, student_appointment_relation R, \
            scheduled_appointments APP WHERE U.id = S.user_id AND S.student_id = R.student_id AND R.appointment_id = APP.appointment_id AND S.student_id = %s;' % (student_id_want)
            

    )

    """
    if appointment_info['student_id'] == '': 
        print("The user does not exist")
        return {
            "statusCode": 404
        }
    else:
        return{
            json_output = json.dumps(sql) #outputs the query in JSON format
            "statusCode": 200
        }
    """


    return {
        'statusCode': 200,
        'body': json.dumps('Hello from get_appointment_supporters Lambda!')
    }