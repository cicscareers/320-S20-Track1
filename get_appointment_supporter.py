import json
import boto3
import constants

#Input: supporter_id
#Output: JSON object of current supporter appointments
def get_appointment_supporters(event, context):

    given_id = event['supporter_id']
    client = boto3.client('rds-data') #Connecting to the database
    appointment_info = client.execute_statement(
        secretArn = constants.SECRET_ARN,
        database = constants.DB_NAME,
        resourceArn = constants.Arn,
        sql = "SELECT * FROM scheduled_appointments WHERE supporter_id = '%s';" % (given_id)
    )
    
    if appointment_info['records'] == '': 
        print("The supporter does not have any appointments")
        return {
            "statusCode": 404
        }
    else:
        return{
            json_output = json.dumps(appointment_info['records']) #outputs the query in JSON format
            "statusCode": 200
        }
    
    """
    appointment_1 = {
                    "student":"Ada Student",
                    "subject": "Mock Interview",
                    "date": "10/10/2020",
                    "time": "10:00 - 10:30",
                    "actions": "Cancel"
        }
        
    appointment_2 = {
                "advisor":"Grace Hopper",
                "subject": "Resume",
                "date": "10/10/2020",
                "time": "12:00 - 1:00",
                "actions": "Cancel"
        }
        
    list = [appointment_1, appointment_2]
    #Hard coded JSON object to return for demo 
    return {
        'statusCode': 200,
        'body': json.dumps(list)
        }