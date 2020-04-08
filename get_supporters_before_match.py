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
            json_output = json.dumps(sql) #outputs the query in JSON format
            "statusCode": 200
        }


    """
    app_1 =  {
                "id":"1",
                "name": "Chinmay Patil",
                "type": "Interview Coaching",
                "date": "2020-03-26",
                "start_time": "13:00",
                "end_time": "13:30",
                "rating": 1.7,
                "location":"LGRC A301"
            }
            
    app_2 = {
                "id":"2",
                "name": "Dhruvil Gala",
                "type": "Salary Negotiation",
                "date": "2020-03-26",
                "start_time": "13:30",
                "end_time": "14:00",
                "rating":2.7,
                "location":"LGRC A301"
            }
    
    app_3 = {
                "id":"3",
                "name": "Brian Krusell",
                "type": "Job Search",
                "date": "2020-03-26",
                "start_time": "14:00",
                "end_time": "14:30",
                "rating":3.7,
                "location":"LGRC A301"
            }
    
    app_4 = {
                "id":"4",
                "name": "Adithya Parmar",
                "type": "Resume/CV",
                "date": "2020-03-26",
                "start_time": "14:30",
                "end_time": "15:00",
                "rating":4.7,
                "location":"LGRC A301"
               }
    
    list = [app_1, app_2, app_3, app_4]
    
    
    return {
        'statusCode': 200,
        'body': json.dumps(list)
    }
