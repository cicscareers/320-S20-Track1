import json
import boto3

# this lambda fetches a JSON list of possible supporters from the database. 
# the list is then filtered down by the front end. 
def get_supporters_before_match(event, context):
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
