import json
import boto3
from package.lambda_expection import LambdaException

# Written by Dat Duong

# input: file_name

print("OOF")


def upload_files(event, context):
    print("hello")

    # get the file name
    file_name = event['file_name']

    # s_3 bucket
    bucket_name = 't1-s3-us-east-1'  # not sure if thats the bucket name ?????

    s_3 = boto3.resource('s_3')

    try:
        # actually uploading
        response = s_3.meta.client.upload_file(
            file_name, bucket_name, file_name)

    except Exception as e:
        raise LambdaException("File failed to uploaded: " + str(e))

    # check if file was uploaded
    # if response['numberOfRecordsUpdated'] == 0:
    #     return {
    #         'statusCode': 404,
    #         'body': json.dumps('Error uploading file')
    #     }

    return {
        'statusCode': 200,
        'body': json.dumps('File %s Uploaded!!!!' % file_name)
    }
