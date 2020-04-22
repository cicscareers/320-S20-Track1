from package.query_db import query
from package

def get_student_settings_handler(event, context):

    student_id = int(event['student_id'])
    student_id_param = [{'name' : 'student_id', 'value' : student_id}]

    error_messages = []

    users_sql = "SELECT * FROM users WHERE id = :student_id"
    try:
        user_data = query(users_sql, student_id_param)['records'][0]
    except Exception as e:
        error_message.append(str(e))

    students_sql = "SELECT * FROM students WHERE student_id = :student_id"
    try:
        student_data = query(students_sql, student_id_param)
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
        'statusCode' : 200,
    }