import json
from package.query_db import query

#Written by Matt Hill
#Input: appointment_id, feedback, rating
#Output: none
#This lambda updates the feedback and rating fields in the student_appointment_relation table.
#It also updates the supporter rating field based on the feedback given

def submit_feedback(event,context):
    given_appointment_id = int(event['appointment_id'])
    print(given_appointment_id)
    given_student_id = int(event['student_id'])
    print(given_student_id)
    feedback = event['feedback']
    rating = int(event['rating'])

    #Check to see if the appointmnet id exists
    sql = 'SELECT appointment_id FROM student_appointment_relation WHERE appointment_id=:given_appointment_id'
    sql_parameters = [{'name':'given_appointment_id', 'value' : {'longValue': given_appointment_id}}]
    exists = query(sql,sql_parameters)
    #print(exists['records'])

    if(exists['records'] == []):
        return{
            'body': json.dumps("The appointment does not exist"),
            'statusCode': 404
        }
    
    #Insert feedback into table if the appointment id exists
    else:
        sql = 'UPDATE student_appointment_relation SET feedback = :feedback, rating = :rating WHERE appointment_id = :given_appointment_id AND student_id = :given_student_id'
        sql_parameters = [{'name':'feedback', 'value' : {'stringValue' : feedback}},
                            {'name':'rating', 'value' : {'longValue' : rating}},
                            {'name':'given_appointment_id', 'value' : {'longValue' : given_appointment_id}},
                            {'name':'given_student_id', 'value' : {'longValue' : given_student_id}}]
        appointment_with_feedback = query(sql,sql_parameters)

        #Check to see if anything was updated
        if(appointment_with_feedback['numberOfRecordsUpdated'] == 0):
            return{
                'body': json.dumps("Appointment feedback not updated"),
                'statusCode': 500
            }
        #If feedback was updated, update supporter rating and return correct status code
        else:
            #query to get associated supporter id (1)
            sql1 = 'SELECT supporter_id FROM student_appointment_relation SR WHERE SR.appointment_id = :given_appointment_id LIMIT 1'
            sql_parameters1 = [{'name':'given_appointment_id', 'value' : {'longValue' : given_appointment_id}}]
            supp_id_query = query(sql1,sql_parameters1)
            supp_id = supp_id_query['records'][0][0]['longValue']
            #print(supp_id)
            
            #query to get sum of rating values for all appointments the supporter has had (2)
            sql2 = 'SELECT SUM(rating) FROM student_appointment_relation WHERE rating IS NOT NULL AND supporter_id = :supp_id'
            sql_parameters2 = [{'name':'supp_id', 'value' : {'longValue' : supp_id}}]
            rating_sum_query = query(sql2,sql_parameters2)
            rating_sum = float(rating_sum_query['records'][0][0]['stringValue'])
            #print(rating_sum)

            #query to get number of entries in SAR for specific supporter id (3)
            sql3 = 'SELECT COUNT(rating) FROM student_appointment_relation WHERE rating IS NOT NULL AND supporter_id = :supp_id'
            sql_parameters3 = [{'name':'supp_id', 'value' : {'longValue' : supp_id}}]
            num_ratings_query = query(sql3,sql_parameters3)
            num_ratings = num_ratings_query['records'][0][0]['longValue']
            #print(num_ratings)

            #divide sum by number of entries to get overall rating
            new_rating = (rating_sum) / (num_ratings)
            #print(new_rating)

            #query to update new overall rating to supporters table (4)
            if(isinstance(new_rating, int)):
                sql4 = 'UPDATE supporters SET rating = :new_rating  WHERE supporter_id = :supp_id'
                sql_parameters4 = [{'name':'new_rating', 'value' : {'longValue' : new_rating}},
                                {'name':'supp_id', 'value' : {'longValue' : supp_id}}]
                query(sql4,sql_parameters4)

                return{
                    'body': json.dumps("Appointment feedback updated"),
                    'statudCode': 200
                }
            if(isinstance(new_rating, float)):
                sql4 = 'UPDATE supporters SET rating = :new_rating  WHERE supporter_id = :supp_id'
                sql_parameters4 = [{'name':'new_rating', 'value' : {'doubleValue' : new_rating}},
                                {'name':'supp_id', 'value' : {'longValue' : supp_id}}]
                query(sql4,sql_parameters4)

                return{
                    'body': json.dumps("Appointment feedback updated"),
                    'statudCode': 200
                }
            
        

