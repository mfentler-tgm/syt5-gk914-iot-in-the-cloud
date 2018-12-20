# 🚫💩 Basement-Shitting Prevention Team 🚫💩

<div align="center">
    <img src="images/groupImage.jpg" alt="Group Image" width="200" align="center" style="border: solid 5px #007700; border-radius: 5px; padding: 5px; background: #553300" />
    <img src="images/basement.gif" alt="Basement Shitting" height="200" align="center" style="border: solid 5px #007700; border-radius: 5px; padding: 5px; background: #553300" />
</div>

## Aufgabenstellung
Die detaillierte [Aufgabenstellung](TASK.md) beschreibt die notwendigen Schritte zur Realisierung.

## Recherche
### Benachrichtigung des Clients
Der Client bekommt eine E-Mail Notification sobald ein Sensor vom Raspi etwas wahr nimmt.
Dazu wird NodeMailer verwendet.

## Implementierung

Als erster Schritt wird ein "Raspbian Linux" Image auf dem Raspberry Pi Zero installiert. Anschließend werden die Dateien  "wpa_supplicant.conf" und eine "ssh" Datei auf die /boot Partition des Raspberry's geladen.

Die "wpa_supplicant.conf" dient zur Netzwerkkonfiguration, da der Raspberry ja sonst nicht über SSH ansprechbar wäre. Die (leere) "ssh" Datei wird benötigt, dass beim Booten SSH am Raspberry aktiviert und erlaub wird.

In der Datei install.sh befinden sich alle wichtigen Befehle, die ausgeführt werden müssen, um die auf GitHub deployte Applikation zu starten und alle benötigten Software-Packages zu installieren.

Es wird ein "apt-get update" & "apt-get upgrade" ausgeführt und anschließend alle Dependencies installiert.

Das Git-Repo wird danach in das Verzeichnis "/app" geladen und anschließend mit "npm start" gestartet.

### Bussysteme
Beim Raspberry Pi gibt es folgende Bussysteme:  
- CAN  
- I2C  
- SPI

## Quellen
