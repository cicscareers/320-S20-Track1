from package.query_db import query
from package.lambda_exception import LambdaException

def get_picture(event, context):
    id = int(event['id'])
    id_param = {'name' : 'id', 'value' : {'longValue' : id}}
    sql = "SELECT picture FROM users WHERE id = :id"
    params = [id_param]
    
    try:
        picture=query(sql, params)["records"]
        
    except Exception as e:
        raise LambdaException("500: Failed to get picture, " + str(e))
    
    response = {}
    
    if picture == []:
        raise LambdaException("404: Picture does not exist, ")
        
    elif "isNull" in picture[0][0]:
        response["picture"] = ""
        
    else:
        response["picture"] = picture[0][0]["stringValue"]
        
    return response