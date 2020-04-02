import boto3
import json

def get_appointment_students(event, context):

    return{
        "statusCode": 200,
        "body": {
            [
                {
                "advisor":"Ada Lovelace",
                "subject": "Mock Interview",
                "date": "10/10/2020",
                "time": "10:00 - 10:30",
                "actions": "Cancel"
                },
                {
                "advisor":"Grace Hopper",
                "subject": "Resume",
                "date": "10/10/2020",
                "time": "12:00 - 1:00",
                "actions": "Cancel"
                }
            ]

        }
    }