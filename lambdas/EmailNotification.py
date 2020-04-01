import os
import boto3
from botocore.exceptions import ClientError
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
# SENDER should be imported from constants.py


# Specify a configuration set. If you do not want to use a configuration
# set, comment the following variable, and the 
# ConfigurationSetName=CONFIGURATION_SET argument below.
CONFIGURATION_SET = "ConfigSet"
SENDER = 'umassreachout.dev@gmail.com'
AWS_REGION = "us-east-1"
CHARSET = "UTF-8"
client = boto3.client('ses',region_name=AWS_REGION)



example_subject = """
HELLO SES $NAME$
"""
example_body = """
<html>
<head></head>
<body>
<h1>Amazon SES Test (SDK for Python)</h1>
<p>This $NAME$ was sent with
    <a href='https://aws.amazon.com/ses/'>Amazon SES</a> using the
    <a href='https://aws.amazon.com/sdk-for-python/'>
    AWS SDK for Python (Boto)</a>.</p>
</body>
</html>
"""     

# params: attribute map, template id
# returns: tuple(recipient, subject, body, attachments)
def generate_email(attributes, template_id):
    # define body variable according to template_id
    # using example_body, for our purposes
    body = example_body
    subject = example_subject

    # attributes is a hashmap
    for attribute in attributes.keys():
        body.replace('$'+str(attribute)+'$', attributes[attribute])
        subject.replace('$'+str(attribute)+'$', attributes[attribute])

    msg = MIMEMultipart('mixed')
    # Add subject, from and to lines.
    msg['Subject'] = subject 
    msg['From'] = SENDER 
    msg['To'] = str(attributes['RECIPIENT'])

    # Create a multipart/alternative child container.
    msg_body = MIMEMultipart('alternative')
    htmlpart = MIMEText(body.encode(CHARSET), 'html', CHARSET)
    msg_body.attach(htmlpart)
    msg.attach(msg_body)
    if(attributes['attachments'] != None):
        att = MIMEApplication(open(attributes('attachments'), 'rb').read())
        att.add_header('Content-Disposition','attachment',filename=os.path.basename(attributes['attachments']))
    msg.attach(att)
    return tuple(str(SENDER), str(attributes['RECIPIENT']), str(msg.as_string()))

# params: tuple(recipient, subject, body, attachments)
# returns: boolean
def send_email(contentTuple):
# Try to send the email.
    try:
        #Provide the contents of the email.
        response = client.send_raw_email(
            Source=contentTuple[0],
            Destinations=[
                contentTuple[1]
            ],
            RawMessage={
                'Data':contentTuple[2],
            },
            ConfigurationSetName=CONFIGURATION_SET
        )
    # Display an error if something goes wrong.	
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("Email sent! Message ID:"),
        print(response['MessageId'])

# Testing function calls
attributeTESTmap = {'name':'David Cincotta', 'subject':'SENDING'}
send_email(generate_email(attributeTESTmap, 999))