from package.query_db import query
from package.lambda_exception import LambdaException
import boto3

def delete_file(bucket, path):
    try:
        boto3.client('s3').delete_object(Bucket=bucket, Key=path)
    except Exception as e:
        raise LambdaException(f"Unable to delete file {path} from S3 bucket {bucket}: {e}")

def upload_file(bucket, path, file):
    try:
        boto3.client('s3').put_object(Bucket=bucket, Key=path, Body=file)
    except Exception as e:
        raise LambdaException(f"Unable to upload file {path} from S3 bucket {bucket}: {e}")

def get_file(bucket, path):
    try:
        response = boto3.client('s3').get_object(Bucket=bucket, Key=path)
    except Exception as e:
        if(e.response['Error']['Code'] == 'NoSuchKey'):
            return ""
        else:
            raise LambdaException(f"Failed to get file {path} from S3 bucket {bucket}: {e}")
    
    return response['Body'].read().decode('utf-8')
    
bucket_name_images = 't1-s3-us-east-1-images' # s3 bucket for images
def delete_image(path):
    delete_file(bucket_name_images, path)

def upload_image(path, file):
    upload_file(bucket_name_images, path, file)

def get_image(path):
    return get_file(bucket_name_images, path)
  
bucket_name_images = 't1-s3-us-east-1-images' # s3 bucket for images
def delete_image(path):
    delete_file(bucket_name_images, path)
