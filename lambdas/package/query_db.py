from package.lambda_exception import LambdaException
from package import db_config
import boto3

secretArn = db_config.SECRET_ARN
dbName = db_config.DB_NAME
arn = db_config.ARN

def query(sql_query, sql_parameters=[], transactionID = ""):
    try:
        client = boto3.client("rds-data")
    except:
        raise LambdaException("Cannot connect to Database")

    try:
        result = client.execute_statement(secretArn=secretArn, database=dbName, resourceArn=arn, sql=sql_query, parameters=sql_parameters, transactionId=transactionID)
    except Exception as e:
        raise LambdaException("Invalid query: " + str(e))

    return result

def beginTransaction():
    try:
        client = boto3.client("rds-data")
    except:
        raise LambdaException("Cannot connect to Database")

    try:
        result = client.begin_transaction(secretArn=secretArn, database=dbName, resourceArn=arn)
    except Exception as e:
        raise LambdaException(str(e))

    return result

def commitTransaction(transactionID):
    try:
        client = boto3.client("rds-data")
    except:
        raise LambdaException("Cannot connect to Database")

    try:
        result = client.commit_transaction(secretArn=secretArn, resourceArn=arn, transactionId=transactionID)
        
    except Exception as e:
        raise LambdaException("Unable to execute the query batch: " + str(e))

    return result
    