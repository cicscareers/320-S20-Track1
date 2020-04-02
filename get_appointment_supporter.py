import json
import boto3
#import constants

#Input: supporter_id
#Output: JSON object of current supporter appointments
def get_appointment_supporters(event, context):
    # TODO implement

    """
    supporter_id_want = event['supporter_id']
    client = boto3.client('rds-data') #Connecting to the database
    appointment_info = client.execute_statement(
        secretArn = constants.SECRET_ARN,
        database = constants.DB_NAME,
        resourceArn = constants.Arn,
        sql = 'SELECT U.first_name, U.last_name, APP.supporter_id, APP.appointment_id, APP.time, APP.type, APP.duration, APP.method, APP.location FROM \
            users U, supporters S, scheduled_appointments APP WHERE U.id = S.user_id AND S.supporter_id = APP.supporter_id AND APP.supporter_id = %s;' % (supporter_id_want)
    )

    
    if appointment_info['supporter_id'] == '': 
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


    #Hard coded JSON object to return for demo 
    return {
        'statusCode': 200,
        'body': {
                    [
                        {
                        "student":"Ada Student",
                        "subject": "Mock Interview",
                        "date": "10/10/2020",
                        "time": "10:00 - 10:30",
                        "actions": "Cancel"
                        },
                        {
                        "student":"Grace Student",
                        "subject": "Resume",
                        "date": "10/10/2020",
                        "time": "12:00 - 1:00",
                        "actions": "Cancel"
                        }
                    ]
                }
        }