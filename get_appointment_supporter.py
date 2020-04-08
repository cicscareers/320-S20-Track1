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
            'statusCode': 404
        }
    else:
        return{
            'statusCode': 200,
            'body': json.dumps(appointment_info['records']) #outputs the query in JSON format 
        }