import boto3
from package.lambda_exception import LambdaException

def get_picture(event, context):
    student_id = int(event['id'])
    
    s_3 = boto3.client('s3')
    bucket_name_images = 't1-s3-us-east-1-images' # s3 bucket for images
    file_path = 'profile/' + str(student_id) + '/image'

    try:
        response = s_3.get_object(Bucket=bucket_name_images, Key=file_path)
    except Exception as e:
        if(e.response['Error']['Code'] == "NoSuchKey"):
            return ""
        else:
            raise LambdaException("400: Failed to download file." + str(e))

    return response['Body'].read()
