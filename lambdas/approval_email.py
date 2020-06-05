#Written by Dhru
#5/3/2020

import json
from package.query_db import query
from package.lambda_exception import LambdaException
import time
import os, datetime
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.utils import COMMASPACE, formatdate
from email import encoders

def lambda_handler(event, context):
    id = int(event['user_id'])
    approved_role = event['approved_role']
    
    if approved_role.lower() == "admin":
        role = "Admin"
        
    elif approved_role.lower() == "supporter":
        role = "Supporter"
        
    else:
        raise LambdaException("Invalid role provided")
    
    sql = "SELECT first_name, last_name, email FROM users WHERE id = :id"
    sql_parameters = [
        {'name': 'id', 'value': {'longValue': id}}
    ]
    info = query(sql, sql_parameters)['records'][0]
    name = info[0].get("stringValue") + " " + info[1].get("stringValue")
    email = info[2].get("stringValue")
    
    send_approval_email(name, email, role)

    return {
        'statusCode': 200,
        'body': json.dumps('Email successfully s')
    }

def send_approval_email(name, email, role):
    # supp = supporter name(str)
    # students = student name(str)
    # appt_time = appointment time (str)
    # duration = duration of appt in minutes (int)
    # location = location of appt (str) or method if location != in person (str)
    # appt_type = type of appt (str)
    # supp_email = supporter email(str) defaults None
    # student_emails = student email(str) defaults None
    
    CRLF = "\r\n"
    login = "umassreachout.dev@gmail.com"
    password = "CS3202020"
    
    fro = "UMass ReachOUT <umassreachout.dev@gmail.com>"
  
    eml_body = """
    Congratulations, an admin has approved your """+role+""" account on ReachOUT.
    <br><br>
    <a href="https://reachout.cics.umass.edu/login">Log in to your account</a> to see your """+role+""" view.
    <br><br>
    Thanks,
    <br>
    Team ReachOUT
    """
    
    eml_body_bin = "This is the email body in binary - two steps"
    msg = MIMEMultipart('mixed')
    msg['Reply-To'] = fro
    msg['Date'] = formatdate(localtime=True)
    
    msg['Subject'] = "ReachOUT " + role + " Account Approved"#+dtstart

    msg['From'] = fro
    msg['To'] = email

    part_email = MIMEText(eml_body,"html")

    msgAlternative = MIMEMultipart('alternative')
    msg.attach(msgAlternative)

    # eml_atch = MIMEBase('text/plain','')
    # encoders.encode_base64(eml_atch)
    # eml_atch.add_header('Content-Transfer-Encoding', "")

    msgAlternative.attach(part_email)
    
    mailServer = smtplib.SMTP('smtp.gmail.com', 587)
    mailServer.ehlo()
    mailServer.starttls()
    mailServer.ehlo()
    mailServer.login(login, password)
    mailServer.sendmail(fro, email, msg.as_string())
    mailServer.close()