import json
from package.query_db import query
from package.dictionary_to_list import dictionary_to_list
from package.lambda_exception import LambdaException
from boto3 import client as boto3_client

def update_supporter_status(event, context):
	supporter_id = int(event['supporter_id'])
	supporter_id_dic = {}

	if supporter_id == None:
		raise LambdaException("400: supporter_id was not given")

	supporter_id_dic['supporter_id'] = supporter_id
	sql_select = """SELECT supporter_id FROM supporters WHERE supporter_id = :supporter_id"""
	sql_paramters_dic = dictionary_to_list(supporter_id_dic)
	response = query(sql_select, sql_paramters_dic)
	
	if response['records'] == []:
		 raise LambdaException("404: this supporter does not exist")

	sql_update = """UPDATE supporters SET is_pending = false WHERE supporter_id = :supporter_id"""
	
	try:
		response = query(sql_update, sql_paramters_dic)
		
	except Exception as e:
		raise LambdaException("404: Unable to update supporters " + str(e))
	
	sql_update = """UPDATE users SET is_supporter = true WHERE id = :supporter_id"""
	
	try:
		response = query(sql_update, sql_paramters_dic)
		
	except Exception as e:
		raise LambdaException("404: Unable to update users table " + str(e))
	
	try:
		response = query(sql_update, sql_paramters_dic)
		
	except Exception as e:
		raise LambdaException("404: Unable to update supporters " + str(e))
	
	sql_update = """INSERT INTO supporter_tags VALUES (:supporter_id, 22)"""
	
	try:
		response = query(sql_update, sql_paramters_dic)
		
	except Exception as e:
		raise LambdaException("404: Unable to update supporter_tags " + str(e))
	
	sql_update = """INSERT INTO user_link VALUES (:supporter_id, 1,'')"""
	
	try:
		response = query(sql_update, sql_paramters_dic)
		
	except Exception as e:
		raise LambdaException("404: Unable to update user_link " + str(e))
	
	sql_update = """INSERT INTO supporter_preferences_for_students VALUES (:supporter_id, :supporter_id, true, 24)"""
	
	try:
		response = query(sql_update, sql_paramters_dic)
		
	except Exception as e:
		raise LambdaException("404: Unable to update supporter_preferences_for_students " + str(e))
	
	sql_update = """INSERT INTO supporter_major_preferences VALUES (:supporter_id, 0)"""
	
	try:
		response = query(sql_update, sql_paramters_dic)
		
	except Exception as e:
		raise LambdaException("404: Unable to update supporter_major_preferences " + str(e))
	
	sql_update = """INSERT INTO supporter_minor_preferences VALUES (:supporter_id, 0)"""
	
	try:
		response = query(sql_update, sql_paramters_dic)
		
	except Exception as e:
		raise LambdaException("404: Unable to update supporter_minor_preferences " + str(e))
	
	sql_update = """INSERT INTO supporter_mediums VALUES (:supporter_id, 1)"""
	
	try:
		response = query(sql_update, sql_paramters_dic)
		
	except Exception as e:
		raise LambdaException("404: Unable to update supporter_mediums " + str(e))
	
	sql_update = """INSERT INTO supporter_specializations VALUES (:supporter_id, 1, 30, 4)"""
	
	try:
		response = query(sql_update, sql_paramters_dic)
		
	except Exception as e:
		raise LambdaException("404: Unable to update supporter_specializations " + str(e))
	
	# send approval email
	lambda_client = boto3_client('lambda')
	email_event = {
	  "user_id": supporter_id,
	  "approved_role": "supporter"
	}
	
	try:
		response = lambda_client.invoke(FunctionName="approval_email",
										   InvocationType='Event',
										   Payload=json.dumps(email_event))
	except Exception as e:
		raise LambdaException("404: Unable to send approval email " + str(e))

	return{
		"statusCode": 200
	}
