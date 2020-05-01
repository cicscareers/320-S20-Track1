from package.query_db import query
from package.lambda_exception import LambdaException

def handler(event, context):

    get_announcements_sql = "SELECT announcement_id, title, announcement FROM announcements;"

    try:
        announcements = query(get_announcements_sql)['records']
    except Exception as e:
        raise LambdaException("500: Failed to get announcements, " + str(e))

    response = {
        "announcements" : []
    }

    for a_id, title, announce in announcements:
        curr_announces = response["announcements"]
        next_announce = {'announcement_id' : s_id, 'title' : title, 'announcement' : announce}
        curr_announces.append(next_announce)
        response['announcements'] = curr_announces

    return response