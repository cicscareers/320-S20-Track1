#Written by Kyle Noring
#5/1/2020

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
    supporter = int(event['supporter_id'])
    student = int(event['student_id'])
    appt_time = event['time_of_appt']
    duration = int(event['duration'])
    location = event['location']
    appt_type = event['appointment_type']
    
    if 'to_cancel' in event and event['to_cancel'] == True:
        toCancel = event['to_cancel']
    else:
        toCancel = False
    if 'requester' in event:
        requester = int(event['requester'])
    else:
        requester = None
    
    sql = "SELECT first_name, last_name, email FROM users WHERE id = :student"
    sql_parameters = [
        {'name': 'student', 'value': {'longValue': student}}
    ]
    stud_info = query(sql, sql_parameters)['records'][0]
    stud_name = stud_info[0].get("stringValue") + " " + stud_info[1].get("stringValue")
    stud_email = stud_info[2].get("stringValue")
    # studs = []
    # studs.append(stud_info[0].get("stringValue") + " " + stud_info[1].get("stringValue"))
    # stud_emails = []
    # stud_emails.append(stud_info[2].get("stringValue"))
    sql = "SELECT first_name, last_name, email from users WHERE id = :supporter"
    sql_parameters = [
        {'name': 'supporter', 'value': {'longValue': supporter}}
    ]
    supp_info = query(sql, sql_parameters)['records'][0]
    supp = supp_info[0].get("stringValue") + " " + supp_info[1].get("stringValue")
    supp_email = supp_info[2].get("stringValue")
    
    if requester != None and requester == student:
        requester_email = stud_email
    elif requester != None and requester == supporter:
        requester_email = supp_email
    elif requester != None:
        raise LambdaException("Requestor is not valid for this appointment")
    
    if toCancel:
        send_cal_email(supp, supp_email, stud_name, stud_email, appt_time, duration, location, appt_type, toCancel=True)
    
    elif requester != None:
        send_cal_email(supp, supp_email, stud_name, stud_email, appt_time, duration, location, appt_type, requester=requester_email)
    else:
        send_cal_email(supp, supp_email, stud_name, stud_email, appt_time, duration, location, appt_type)

    return {
        'statusCode': 200,
        'body': json.dumps('Email successfully s')
    }

def send_cal_email(supp, supp_email, student, student_email, appt_time, duration, location, appt_type, toCancel=False, requester=None):
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
    # attendees = ["first@gmail.com",     "second@example.com","third@hotmail.com"]
    attendees = []
    attendees.append(supp_email)
    attendees.append(student_email)
    # attendees.append(supp_email)
    # for x in student_emails:
    #     attendees.append(x)
    #s = supp.split('@')
    
    organizer = "ORGANIZER;CN=ReachOUT:mailto:umassreachout.dev"+CRLF+" @gmail.com"
    fro = "UMass ReachOUT <umassreachout.dev@gmail.com>"

    ddtstart = datetime.datetime.strptime(appt_time, "%Y-%m-%d %H:%M:%S")
    print(ddtstart)
    #dtoff = datetime.timedelta(days = 1)
    dur = datetime.timedelta(minutes=duration)
    #ddtstart = ddtstart +dtoff
    ddtend = ddtstart + dur
    dtstamp = datetime.datetime.now().strftime("%Y%m%dT%H%M%S%Z")
    dtstart = ddtstart.strftime("%Y%m%dT%H%M%S%Z")
    print(dtstart)
    dtend = ddtend.strftime("%Y%m%dT%H%M%S%Z")

    description = "DESCRIPTION:"+appt_type+" appointment between "+supp+" and student(s) "+", ".join(student)+" "+CRLF
    attendee = ""
    for att in attendees:
        attendee += "ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-    PARTICIPANT;PARTSTAT=ACCEPTED;RSVP=TRUE"+CRLF+" ;CN="+att+";X-NUM-GUESTS=0:"+CRLF+" mailto:"+att+CRLF
    ical = "BEGIN:VCALENDAR"+CRLF
    ical+= "PRODID:AppointmentCalendarInvite"+CRLF
    ical+= "VERSION:2.0"+CRLF
    ical+= "CALSCALE:GREGORIAN"+CRLF
    if toCancel:
        ical+= "METHOD:CANCEL"+CRLF
    else:
        ical+= "METHOD:REQUEST"+CRLF
    ical+= "BEGIN:VEVENT"+CRLF
    ical+= "DTSTART:"+dtstart+CRLF
    ical+= "DTEND:"+dtend+CRLF
    #ical+= "DTSTAMP:"+dtstamp+CRLF+organizer+CRLF
    ical+= "UID:FIXMEUID"+dtstart+CRLF+attendee
    #ical+= "CREATED:"+dtstamp+CRLF+description
    ical+= "LAST-MODIFIED:"+dtstamp+CRLF
    ical+= "LOCATION:"+location+CRLF
    ical+= "SEQUENCE:0"+CRLF
    if toCancel:
        ical+= "STATUS:CANCELLED"+CRLF
    else:
        ical+= "STATUS:CONFIRMED"+CRLF
    ical+= "SUMMARY:ReachOUT "+appt_type+" Appointment"+CRLF
    # ical+= ddtstart.strftime("%m/%d at %I:%M %p")+CRLF
    ical+= "TRANSP:OPAQUE"+CRLF
    ical+= "END:VEVENT"+CRLF
    # ical+= "BEGIN:VALARM"+CRLF
    # ical+= "TRIGGER:-PT15M"+CRLF
    # ical+= "ACTION:DISPLAY"+CRLF
    # ical+= "DESCRIPTION: Reminder for your ReachOUT Appointment"+CRLF
    # ical+= "END:VALARM"+CRLF
    ical+= "END:VCALENDAR"+CRLF

    if requester != None:
        attendees = []
        attendees.append(requester)
    if toCancel:
        eml_body = appt_type+" appointment between "+supp+" and student "+student+" from "+ddtstart.strftime("%B %d, %Y from %I:%M %p")+" to "+ddtend.strftime("%I:%M %p")+" has been cancelled."
    
    else:    
        eml_body = appt_type+" appointment between "+supp+" and student "+student+" has been scheduled for "+ddtstart.strftime("%B %d, %Y from %I:%M %p")+" to "+ddtend.strftime("%I:%M %p")
    eml_body_bin = "This is the email body in binary - two steps"
    msg = MIMEMultipart('mixed')
    msg['Reply-To'] = fro
    msg['Date'] = formatdate(localtime=True)
    if toCancel:
        msg['Subject'] = "ReachOUT Appointment Cancellation"#+dtstart
    else:
        msg['Subject'] = "ReachOUT Appointment Confirmation"#+dtstart
    msg['From'] = fro
    msg['To'] = ",".join(attendees)

    part_email = MIMEText(eml_body,"html")
    part_cal = MIMEText(ical,'calendar;method=REQUEST')

    msgAlternative = MIMEMultipart('alternative')
    msg.attach(msgAlternative)

    ical_atch = MIMEBase('application/ics', ' ;name="%s"' %("invite.ics"))
    ical_atch.set_payload(ical)
    encoders.encode_base64(ical_atch)
    ical_atch.add_header('Content-Disposition', 'attachment; filename="%s"'%("invite.ics"))

    # eml_atch = MIMEBase('text/plain','')
    # encoders.encode_base64(eml_atch)
    # eml_atch.add_header('Content-Transfer-Encoding', "")

    msgAlternative.attach(part_email)
    msgAlternative.attach(part_cal)

    mailServer = smtplib.SMTP('smtp.gmail.com', 587)
    mailServer.ehlo()
    mailServer.starttls()
    mailServer.ehlo()
    mailServer.login(login, password)
    mailServer.sendmail(fro, attendees, msg.as_string())
    mailServer.close()#Written by Kyle Noring
#5/1/2020

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
    supporter = int(event['supporter_id'])
    student = int(event['student_id'])
    appt_time = event['time_of_appt']
    duration = int(event['duration'])
    location = event['location']
    appt_type = event['appointment_type']
    
    if 'to_cancel' in event and event['to_cancel'] == True:
        toCancel = event['to_cancel']
    else:
        toCancel = False
    if 'requester' in event:
        requester = int(event['requester'])
    else:
        requester = None
    
    sql = "SELECT first_name, last_name, email FROM users WHERE id = :student"
    sql_parameters = [
        {'name': 'student', 'value': {'longValue': student}}
    ]
    stud_info = query(sql, sql_parameters)['records'][0]
    stud_name = stud_info[0].get("stringValue") + " " + stud_info[1].get("stringValue")
    stud_email = stud_info[2].get("stringValue")
    # studs = []
    # studs.append(stud_info[0].get("stringValue") + " " + stud_info[1].get("stringValue"))
    # stud_emails = []
    # stud_emails.append(stud_info[2].get("stringValue"))
    sql = "SELECT first_name, last_name, email from users WHERE id = :supporter"
    sql_parameters = [
        {'name': 'supporter', 'value': {'longValue': supporter}}
    ]
    supp_info = query(sql, sql_parameters)['records'][0]
    supp = supp_info[0].get("stringValue") + " " + supp_info[1].get("stringValue")
    supp_email = supp_info[2].get("stringValue")
    
    if requester != None and requester == student:
        requester_email = stud_email
    elif requester != None and requester == supporter:
        requester_email = supp_email
    elif requester != None:
        raise LambdaException("Requestor is not valid for this appointment")
    
    if toCancel:
        send_cal_email(supp, supp_email, stud_name, stud_email, appt_time, duration, location, appt_type, toCancel=True)
    
    elif requester != None:
        send_cal_email(supp, supp_email, stud_name, stud_email, appt_time, duration, location, appt_type, requester=requester_email)
    else:
        send_cal_email(supp, supp_email, stud_name, stud_email, appt_time, duration, location, appt_type)

    return {
        'statusCode': 200,
        'body': json.dumps('Email successfully s')
    }

def send_cal_email(supp, supp_email, student, student_email, appt_time, duration, location, appt_type, toCancel=False, requester=None):
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
    # attendees = ["first@gmail.com",     "second@example.com","third@hotmail.com"]
    attendees = []
    attendees.append(supp_email)
    attendees.append(student_email)
    # attendees.append(supp_email)
    # for x in student_emails:
    #     attendees.append(x)
    #s = supp.split('@')
    
    organizer = "ORGANIZER;CN=ReachOUT:mailto:umassreachout.dev"+CRLF+" @gmail.com"
    fro = "UMass ReachOUT <umassreachout.dev@gmail.com>"

    ddtstart = datetime.datetime.strptime(appt_time, "%Y-%m-%d %H:%M:%S")
    print(ddtstart)
    #dtoff = datetime.timedelta(days = 1)
    dur = datetime.timedelta(minutes=duration)
    #ddtstart = ddtstart +dtoff
    ddtend = ddtstart + dur
    dtstamp = datetime.datetime.now().strftime("%Y%m%dT%H%M%S%Z")
    dtstart = ddtstart.strftime("%Y%m%dT%H%M%S%Z")
    print(dtstart)
    dtend = ddtend.strftime("%Y%m%dT%H%M%S%Z")

    description = "DESCRIPTION:"+appt_type+" appointment between "+supp+" and student(s) "+", ".join(student)+" "+CRLF
    attendee = ""
    for att in attendees:
        attendee += "ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-    PARTICIPANT;PARTSTAT=ACCEPTED;RSVP=TRUE"+CRLF+" ;CN="+att+";X-NUM-GUESTS=0:"+CRLF+" mailto:"+att+CRLF
    ical = "BEGIN:VCALENDAR"+CRLF
    ical+= "PRODID:AppointmentCalendarInvite"+CRLF
    ical+= "VERSION:2.0"+CRLF
    ical+= "CALSCALE:GREGORIAN"+CRLF
    if toCancel:
        ical+= "METHOD:CANCEL"+CRLF
    else:
        ical+= "METHOD:REQUEST"+CRLF
    ical+= "BEGIN:VEVENT"+CRLF
    ical+= "DTSTART:"+dtstart+CRLF
    ical+= "DTEND:"+dtend+CRLF
    #ical+= "DTSTAMP:"+dtstamp+CRLF+organizer+CRLF
    ical+= "UID:FIXMEUID"+dtstart+CRLF+attendee
    #ical+= "CREATED:"+dtstamp+CRLF+description
    ical+= "LAST-MODIFIED:"+dtstamp+CRLF
    ical+= "LOCATION:"+location+CRLF
    ical+= "SEQUENCE:0"+CRLF
    if toCancel:
        ical+= "STATUS:CANCELLED"+CRLF
    else:
        ical+= "STATUS:CONFIRMED"+CRLF
    ical+= "SUMMARY:ReachOUT "+appt_type+" Appointment"+CRLF
    # ical+= ddtstart.strftime("%m/%d at %I:%M %p")+CRLF
    ical+= "TRANSP:OPAQUE"+CRLF
    ical+= "END:VEVENT"+CRLF
    # ical+= "BEGIN:VALARM"+CRLF
    # ical+= "TRIGGER:-PT15M"+CRLF
    # ical+= "ACTION:DISPLAY"+CRLF
    # ical+= "DESCRIPTION: Reminder for your ReachOUT Appointment"+CRLF
    # ical+= "END:VALARM"+CRLF
    ical+= "END:VCALENDAR"+CRLF

    if requester != None:
        attendees = []
        attendees.append(requester)
    if toCancel:
        eml_body = appt_type+" appointment between "+supp+" and student "+student+" from "+ddtstart.strftime("%B %d, %Y from %I:%M %p")+" to "+ddtend.strftime("%I:%M %p")+" has been cancelled."
    
    else:    
        eml_body = appt_type+" appointment between "+supp+" and student "+student+" has been scheduled for "+ddtstart.strftime("%B %d, %Y from %I:%M %p")+" to "+ddtend.strftime("%I:%M %p")
    eml_body_bin = "This is the email body in binary - two steps"
    msg = MIMEMultipart('mixed')
    msg['Reply-To'] = fro
    msg['Date'] = formatdate(localtime=True)
    if toCancel:
        msg['Subject'] = "ReachOUT Appointment Cancellation"#+dtstart
    else:
        msg['Subject'] = "ReachOUT Appointment Confirmation"#+dtstart
    msg['From'] = fro
    msg['To'] = ",".join(attendees)

    part_email = MIMEText(eml_body,"html")
    part_cal = MIMEText(ical,'calendar;method=REQUEST')

    msgAlternative = MIMEMultipart('alternative')
    msg.attach(msgAlternative)

    ical_atch = MIMEBase('application/ics', ' ;name="%s"' %("invite.ics"))
    ical_atch.set_payload(ical)
    encoders.encode_base64(ical_atch)
    ical_atch.add_header('Content-Disposition', 'attachment; filename="%s"'%("invite.ics"))

    # eml_atch = MIMEBase('text/plain','')
    # encoders.encode_base64(eml_atch)
    # eml_atch.add_header('Content-Transfer-Encoding', "")

    msgAlternative.attach(part_email)
    msgAlternative.attach(part_cal)

    mailServer = smtplib.SMTP('smtp.gmail.com', 587)
    mailServer.ehlo()
    mailServer.starttls()
    mailServer.ehlo()
    mailServer.login(login, password)
    mailServer.sendmail(fro, attendees, msg.as_string())
    mailServer.close()