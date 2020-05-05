# Backlogged Issues and GitHub Pull Requests
## Front-End and Back-End Teams
[***Backlogged issues and git pull requests***]() //TODO

## AWS Cloud Backlogs
### [AWS SES](https://github.com/david-fisher/320-S20-Track1/issues/358)
Currently the scripts for email notifictions for appointments including sending .ics files with calendar invites are using a standard SMTP python library. This method of sending emails is insecure and it would the preferable to use the more secure AWS SES to send email invites. In order to set this up, the SES environment must be moved to a production environment from its current sandbox environment. The sandbox environment only allows emails to me sent from and to SES verified emails. Use [this tutorial](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html) to migrate out of the SES sandbox and into the production environment.

### [Web Application Firewall](https://github.com/david-fisher/320-S20-Track1/issues/355)
We can deploy ACL(Access Control List) to filter any part of the web request, such as IP addresses, HTTP headers, HTTP body, or URI strings. This allows us to block common attack patterns, such as SQL injection or cross-site scripting.  
  
We didn’t deploy it because it’s not part of the non-functional requirements and it makes
extra cost.

### [CloudWatch](https://github.com/david-fisher/320-S20-Track1/issues/360)
No alarms are currently set to monitor the cost of the AWS services used because this was not a main priority and there wasn't firm grasp on the baseline usage. All the Lambdas and its logs are in us-east-2 (Ohio) and  currently all billing alarms are displayed on us-east-1 (Virginia), but I don't believe this should be a problem because CloudWatch has cross-region functionalities.
