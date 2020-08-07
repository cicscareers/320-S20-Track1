from package.query_db import query
from package.lambda_exception import LambdaException

def add_announcements(event, context):
    title = event['title']
    title_param = {'name' : 'title', 'value' : {'stringValue' : title}}

    announcement = event['announcement']
    announcement_param = {'name' : 'announcement', 'value' : {'stringValue' : announcement}}

    announcement_id_sql = "SELECT accouncement_id FROM announcements ORDER BY accouncement_id DESC LIMIT 1;"
    try:
        accouncement_id = query(announcement_id_sql)['records']
        if len(accouncement_id) > 0:
            if 'longValue' in accouncement_id[0][0]:
                accouncement_id = accouncement_id[0][0]['longValue'] + 1
            else:
                raise LambdaException("500: accouncement_id is invalid")
        else:
            accouncement_id = 1
        announcement_id_param = {'name' : 'accouncement_id', 'value' : {'longValue' : accouncement_id}}

    except Exception as e:
        raise LambdaException("Failed to get announcement ids: " + str(e))

    add_sql = "INSERT INTO announcements VALUES (:accouncement_id, :title, :announcement)"
    params = [title_param, announcement_param, announcement_id_param]

    try:
        query(add_sql, params)

        return {
            'body' : "announcement successfully created"
        }
    except Exception as e:
        raise LambdaException("500: Failed to add announcement: " + str(e))