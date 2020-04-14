import boto3
import db_config

secretArn = db_config.SECRET_ARN
dbName = db_config.DB_NAME
arn = db_config.ARN

def query(sql_query):
    client = boto3.client("rds-data")

    result = client.execute_statement(secretArn, dbName, arn, sql_query)

    return result