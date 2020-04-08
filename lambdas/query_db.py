import boto3
import db_config

secretArn = db_config.SECRET_ARN
dbName = db_config.DB_NAME
resourceArn = db_config.RESOURCE_ARN

def query(sql_query):
    client = boto3.client("rds-data")

    result = client.execute_statement(secretArn, dbName, resourceArn, sql_query)

    return result