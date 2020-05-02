import json
import boto3
import mimetypes
from package.lambda_exception import LambdaException
from datetime import datetime

# Written by Dat Duong

# input: file_name
# input: user_id
# input: file_type ??????????????????


print("OOF")


def upload_files(event, context):

    # get the file name
    file_name = event['file_name']

    # getting the type of file
    file_type = event['file_type']

    # getting user
    user_id = event['user_id']

    # s_3 bucket
    bucket_name_images = 't1-s3-us-east-1-images'
    bucket_name_resumes = 't1-s3-us-east-1-storage'

    # s_3 = boto3.resource('s3')
    s_3 = boto3.client('s3')

    # get timestamp
    now = str(datetime.now().time())

    # if picture assign to appropiate bucket
    if file_type == 'picture':

        bucket_name = bucket_name_images

    # if resume assign to appropiate bucket
    if file_type == 'resume':

        bucket_name = bucket_name_resumes

    try:
        # actually uploading
        with open(file_name, 'rb') as data:
            s_3.upload_fileobj(data, bucket_name, str(
                user_id) + '/' + now + file_name)

        # response = s_3.meta.client.upload_file(
        #     file_name, bucket_name, "gen2_folder/" + file_name) # maybe timestamp

    except Exception as e:
        raise LambdaException("400: File failed to uploaded")

    return {
        'statusCode': 200,
        'body': json.dumps('File %s Uploaded!!!! to bucket %s' % (file_name, bucket_name))

    }
