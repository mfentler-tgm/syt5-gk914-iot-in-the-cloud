# Raspbian Imagefile Konfiguration
Die folgenden Schritte wurden aus dem vorhandenen Dokument von Herr Professor Borko entnommen, und angepasst.

## Schritte

1. Raspbian Image auf die SD-Karte flashen:  
Dazu wurde das neueste Raspbian-Stretch-Light Image von [hier](https://www.raspberrypi.org/downloads/raspbian/) herunter geladen und mit der Software [Etcher](https://www.balena.io/etcher/) auf die SD Karte geflasht.

2. Image File mounten:  
Da man auf Windows nur den boot Ordner sieht, nicht aber den root Ordner, muss Linux verwendet werden. Dazu wurde ein VM mit Ubuntu verwendet.  
Um die SD Karte mit der VM zu verbinden braucht man einen USB zu SD Adapter. In der VM muss man noch diesen USB Port vom Host auf die VM ändern.  

Anschließend muss man die 2 Folder (root und boot) auf zwei Ordner in der VM mounten, damit man diese nachher bearbeiten kann.
```bash
sudo mkdir /mnt/boot
sudo mkdir /mnt/root

sudo mount /dev/sdc1 /mnt/boot
sudo mount /dev/sdc2 /mnt/root
```

Um herauszufinden auf welchem "/dev/sdc..." Verzeichnis der USB Adapter angeschlossen ist, führt man diesen Befehl aus:  
```bash
sudo fdisk /dev/sdc
```

3. Konfiguration im Boot-Folder
In den Boot Ordner kommen jetzt folgende Dinge:  
- Ein leeres ssh File
- Die wpa_supplicant.conf, in der die Netzwerkkonfiguration steht  
In dieses File kommt folgende Konfiguration, die uns den Pi mit dem TGM-Netzwerk verbindet. Als Passwort wurde ein hash verwendet.  
```bash
network={
  ssid="TGM1x"
  scan_ssid=1
  key_mgmt=WPA-EAP
  identity="cbarosch"
  password=hash:041096d6783b98b9fbc07c82d8f10b6a
  eap=PEAP
  phase2="auth=MSCHAPV2"
}
```

4. Konfiguration im Root-Folder  
Dort muss das File "/etc/network/interfaces" geändert werden. Dort sagen wir unter anderem, dass ein Python Script ausgeführt werden soll, dass uns die IP des PIs schickt sobald dieser hochgefahren ist.  
```bash
source-directory /etc/network/interfaces.d

auto wlan0
allow-hotplug wlan0


iface wlan0 inet dhcp
	wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
	post-up /etc/network/if-up.d/sendIP.py

iface default inet dhcp
```
In dem Python File muss der Absender noch auf unseren Gmail Account geändert werden.  
```python
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
```

5. Unmounten
Als letzter Schritt muss man die SD Karte noch unmounten. Dazu geht man in Linux in den File-Archiver und klickt auf den "Pfeil-Button" rechts neben dem Boot-Folder.