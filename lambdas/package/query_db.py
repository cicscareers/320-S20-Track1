from package.lambda_exception import LambdaException
from package import db_config
import boto3

secretArn = db_config.SECRET_ARN
dbName = db_config.DB_NAME
arn = db_config.ARN

def query(sql_query):
    try:
        client = boto3.client("rds-data")
    except:
        raise LambdaException("Cannot connect to Database")

    try:
        result = client.execute_statement(secretArn, dbName, arn, sql_query)
    except:
        raise LambdaException("Invalid query")

    return result