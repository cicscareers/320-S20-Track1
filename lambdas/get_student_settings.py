from package.query_db import query
from package

def get_student_settings_handler(event, context):

    student_id = int(event['student_id'])
    student_id_param = [{'name' : 'student_id', 'value' : student_id}]

    response = {}
    error_messages = []

    users_sql = "SELECT first_name, last_name, email, preferred_name, picture, bio, pronouns, gender, phone FROM users WHERE id = :student_id"
    try:
        user_data = query(users_sql, student_id_param)['records'][0]

        response['first_name'] = user_data[0]['stringValue']
        response['last_name'] = user_data[1]['stringValue']
        response['email'] = user_data[2]['stringValue']
        response['preferred_name'] = user_data[3]['stringValue']
        response['picture'] = user_data[4]['stringValue']
        response['bio'] = user_data[5]['stringValue']
        response['pronouns'] = user_data[6]['stringValue']
        response['gender'] = user_data[7]['stringValue']
        response['phone'] = user_data[8]['stringValue']

    except Exception as e:
        error_message.append(str(e))

    students_sql = "SELECT college, grad_year, resume, job_search, grad_student FROM students WHERE student_id = :student_id"
    try:
        student_data = query(students_sql, student_id_param)

        response['college'] = student_data[0]['stringValue']
        response['grad_year'] = student_data[1]['stringValue']
        response['resume'] = student_data[2]['stringValue']
        response['job_search'] = student_data[3]['booleanValue']
        response['grad_student'] = student_data[4]['booleanValue']

    except Exception as e:
        error_messages.append(str(e))

    majors_sql = "SELECT * FROM student_majors WHERE student_id = :student_id"
    try:
        student_major_ids = query(majors_sql, student_id_param)['records'][0]
        major_ids = student_major_ids[0]['stringValue']
        for major_id in student_major_ids[1:]:
            major_ids += " OR major_id = " + major_id['stringValue']

        student_majors_sql = "SELECT major FROM major WHERE major_id = " + major_ids + ";"
        try:
            student_majors = query(student_majors_sql) 
        except Exception as e:
            error_messages.append(str(e))

    minors_sql = "SELECT * FROM student_minors WHERE student_id = :student_id"
    try:
        student_minor_ids = query(minors_sql, student_id_param)['records'][0]
        minor_ids = student_minor_ids[0]['stringValue']
        for minor_id in student_minor_ids[1:]:
            minor_ids += " OR minor_id = " + minor_id['stringValue']

        student_minors_sql = "SELECT minor FROM minor WHERE minor_id = " + minor_ids + ";"
        try:
            student_minors = query(student_minors_sql)
        except Exception as e:
            error_messages.append(str(e))

    return {
        'statusCode' : 200
    }