#!/usr/bin/python3
import smtplib
import datetime
import subprocess

passwd = "NoShittingAnymore"
user = "shittingpreventionagent@gmail.com"

sender = user
recipients = "chrispad2k@gmail.com cbarosch@student.tgm.ac.at mfentler@student.tgm.ac.at mrousavy@student.tgm.ac.at odeveci@student.tgm.ac.at".split()
subject = "RaspberryPi is now up ..."

now = datetime.datetime.now()

msg = ("From: %s\r\nTo: %s\r\nSubject: %s\r\n"
        % (sender, ", ".join(recipients), subject))

msg = msg + "Testmail generated @" + str(now) + "\r\n\r\n"
msg = msg + subprocess.check_output('ip address', shell=True).decode()

def sendmail():
    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.set_debuglevel(0)
        server.ehlo()
        server.login(user, passwd)
        server.sendmail(sender, recipients, msg)
        server.quit()
        print("Email sent successfully!")
    except smtplib.SMTPAuthenticationError as e:
        print("Username and Password not accepted.")
        return False
    except:
        print("Unable to send the email!")
        return False
    return True

while sendmail() != True:
    try:
        print("Trying ... ")
    except KeyboardInterrupt as e:
        print("\nUser interrupt detected ...")
        print("Email was not sent. Please check your connectivity!")
        break
