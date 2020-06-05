from package.query_db import query
from package.lambda_exception import LambdaException

def update_announcements(event, context):

    accouncement_id = int(event['announcement_id'])
    id_param = {'name' : 'accouncement_id', 'value' : {'longValue' : accouncement_id}}

    title = event['title']
    title_param = {'name' : 'title', 'value' : {'stringValue' : title}}

    announcement = event['announcement']
    announcement_param = {'name' : 'announcement', 'value' : {'stringValue' : announcement}}

    update_sql = "UPDATE announcements SET announcement = :announcement, title = :title WHERE accouncement_id = :accouncement_id"
    params = [id_param, announcement_param, title_param]

    try:
        query(update_sql, params)
    except Exception as e:
        raise LambdaException("500: Failed to update announcement, " + str(e))

    return {
        'body' : "Successfully updated announcement"
    }