import json
import boto3
from package.lambda_exception import LambdaException
from package.query_db import query
from datetime import datetime

# Written by Dat Duong

# input: file_name
# input: file_obj
# input: user_id
# input: file_type "resume" or "picture"

print("OOF")


def upload_files(event, context):

    # get the file name
    file_name = event['file_name']

    # get data of file
    file_obj = event['file_obj']

    # getting the type of file
    file_type = event['file_type']

    # getting user
    user_id = event['user_id']

    # s_3 bucket
    bucket_name_images = 't1-s3-us-east-1-images'
    bucket_name_resumes = 't1-s3-us-east-1-storage'

    s_3 = boto3.client('s3')

    # get timestamp
    now = str(datetime.now().strftime("%Y-%m-%d_%H:%M:%S"))

    # if picture assign to appropiate bucket
    if file_type == 'picture':

        bucket_name = bucket_name_images

    # if resume assign to appropiate bucket
    if file_type == 'resume':

        bucket_name = bucket_name_resumes

    # new folder and file name with timestamp going into s3
    key = str(user_id) + '/' + now + '_' + file_name

    try:
        # actually uploading
        # creating/adding user_id folder and adding timestamp to file_name
        # with open(file_name, 'rb') as data:
        s_3.upload_fileobj(file_obj, bucket_name, key)

    except Exception as e:
        raise LambdaException("400: File failed to uploaded")

    # update in database
    if file_type == 'picture':

        sql = 'UPDATE users SET picture = :picture WHERE id = :user_id'
        sql_parameters = [{'name': 'picture', 'value': {'stringValue': key}},
                          {'name': 'user_id', 'value': {'longValue': user_id}}]

    if file_type == 'resume':

        sql = 'UPDATE students SET resume = :resume from users WHERE users.id = :user_id and users.id = students.user_id'
        sql_parameters = [{'name': 'resume', 'value': {'stringValue': key}},
                          {'name': 'user_id', 'value': {'longValue': user_id}}]

    update_query = query(sql, sql_parameters)

    # Check if updated
    if(update_query['numberOfRecordsUpdated'] == 0):
        return{
            'body': json.dumps("file not in database"),
            'statusCode': 500
        }

    return {
        'statusCode': 200,
        'body': json.dumps('File %s Uploaded!!!! to bucket %s' % (file_name, bucket_name))

    }
