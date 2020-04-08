import json
import boto3
import constants

# This lambda fetches a JSON list of available appointments blocks from the database. 
# the list is then filtered down by the front end. 
# Input: start_date, end_date
# Output: JSON object containing all possible appointments within given start and end date
def get_supporters_before_match(event, context):
    # TODO implement

    #client = boto3.client('rds-data') #Connecting to the database
    
    #Hard-coded JSON object for the demoo
    
    start_date = event['start_date']
    end_date = event['end_date']
    client = boto3.client('rds-data') #Connecting to the database
    appointment_info = client.execute_statement(
        secretArn = constants.SECRET_ARN,
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = #query that gets available appointment blocks
    )

    if appointment_info['start_date', 'end_date'] == '': 
        print("There are no appointment blocks available")
        return {
            "statusCode": 404
        }
    else:
        return{
            'statusCode': 200,
            'body': json.dumps(appointment_info['records']) #outputs the query in JSON format 
        }

