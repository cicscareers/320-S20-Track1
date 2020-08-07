from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    params = []

    if event['supporter_id'] != "":
        supporter_id = int(event['supporter_id'])
        supporter_id_param = {'name' : 'supporter_id', 'value' : {'longValue' : supporter_id}}
        params.append(supporter_id_param)
    else: 
        raise LambdaException("400: Request missing supporter id")

    #Confirm that supporter exists
    supporter_sql = "SELECT user_id FROM supporters WHERE supporter_id = :supporter_id"
    try:
        existing_supporter = query(supporter_sql, params)['records']
    except Exception as e:
        raise LambdaException("500: Unable to confirm that supporter exists, " + str(e))

    if existing_supporter = []:
        raise LambdaException("404: Supporter not found")


    if event['update_series'] != "":
        update_series = event['update_series'].lower()
        if update_series == 'true':
            update_series = True
            if event['recurring_id'] != "":
                recurring_id = int(event['recurring_id'])
                recurring_id_param = {'name' : 'recurring_id', 'value' : {'longValue' : recurring_id}}
                params.append(recurring_id_param)
            else:
                raise LambdaException("400: Request does not provide recurring_id")
        else:
            update_series = False
    else:
        raise LambdaException("400: Request does not specify whether update should be made to block instance or series")


    if event['appointment_block_id'] != "":
        appt_block_id = int(event['appointment_block_id'])
        appt_block_id_param = {'name' : 'appt_block_id', 'value' : {'longValue' : appt_block_id}}
        params.append(appt_block_id_param)
    else:
        raise LambdaException("400: Request missing appointment block id")

    #Confirm that appointment block exists
    appt_block_sql = "SELECT appointment_block_id FROM appointment_block WHERE appointment_block_id = :appt_block_id"
    try:
        existing_block = query(appt_block_sql, params)['records']
    except Exception as e:
        raise LambdaException("500: Unable to confirm that appointment block exists, " + str(e))

    if existing_block == []:
        raise(LambdaException("404: Appointment block not found"))

    
    #Appointment Block Table
    values = []
    if event['start_date'] != "":
        start_date = event['start_date']
        values.append("start_date = :start_date")
        start_date_param = {'name' : 'start_date', 'typeHint' : 'TIMESTAMP', 'value' : {'stringValue': start_date}}
        params.append(start_date_param)


    if event['end_date'] != "":
        end_date = event['end_date']
        values.append("end_date = :end_date")
        end_data_param = {'name' : 'end_date', 'typeHint' : 'TIMESTAMP', 'value' : {'stringValue' : end_date}}
        params.append(end_data_param)


    if event['max_num_of_appts'] != "":
        max_appts = int(event['max_num_of_appts'])
        values.append("max_num_of_appts = :max_appts")
        max_appts_param = {'name' : 'max_appts', 'value' : {'longValue' : max_appts}}
        params.append(max_appts_param)

    if update_series:
        update_block_sql = "UPDATE appointment_block SET" + ", ".join(values) + " WHERE recurring_id = :recurring_id;"
    else:
        update_block_sql = "UPDATE appointment_block SET" + ", ".join(values) + " WHERE appointment_block_id = :appt_block_id"

    response = {}
    try:
        query(update_block_sql, params)
        response['body'] = "Appointment block successffully updated"
    except Exception as e:
        raise LambdaException("500: Failed to update appointment block, " + str(e))

    return response


    ### As of 05/03/2020 Specializations for block are not being used

    #Specilizations for Block Table
    # if event['specializations'] != "":

    #     #Delete existing specializations for block
    #     delete_spec_sql = "DELETE FROM specializations_for_block WHERE appointment_block_id = :appt_block_id"
    #     try:
    #         query(delete_spec_sql, params)
    #     except Exception as e:
    #         raise LambdaException("500: Failed to delete out dated specializations for block, " + str(e))

    #     specializations = event['specializations']
    #     specializations = specializations.strip('][').split(', ')

    #     spec_sql = "INSERT INTO specializations_for_block (specialization_type_id, appointment_block_id) VALUES "
    #     spec_params = [appt_block_id_param]

    #     values = []
    #     for spec in specializations:
        
    #         val = " ((SELECT specialization_type_id FROM specialization_type WHERE specialization_type = :" + spec + "), :appt_block_id)"
    #         spec_params.append({'name' : spec, 'value' : {'stringValue' : spec}})

    #     spec_sql = spec_sql + ", ".join(values) + ";"

   



   
