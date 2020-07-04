from package.query_db import query
from package.lambda_exception import LambdaException
import boto3


def delete_file(bucket, path):
    s_3 = boto3.client('s3')
    try:
        s_3.delete_object(Bucket=bucket, Key=path)
    except Exception as e:
        raise LambdaException(f"Unable to delete file {path} from S3 bucket {bucket}: {str(e)}")

bucket_name_images = 't1-s3-us-east-1-images' # s3 bucket for images
def delete_image(path):
    delete_file(bucket_name_images, path)