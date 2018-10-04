# GK9.1.4 Embedded Systems "IoT in der Cloud" - Taskdescription

## Einführung
Diese Übung gibt eine Einführung in die Verwendung von Sensoren und deren Datenanzeige in der Cloud.

## Ziele
Das Ziel ist es mit verschiedenen Sensoren Daten auszulesen und diese entsprechend aggregiert über eine Weboberfläche anzuzeigen.
Um die Sensordaten verarbeiten und weiterleiten zu können ist entweder ein uC oder ein SBC (z.B. RaspberryPi) notwendig, der über geeignete Schnittstellen Daten an die Cloud weiterleitet.

## Voraussetzungen
* Verwendung von Single-Board-Computer bzw. Mikrokontroller
* Verständnis von Bussystemen im Hardware-Bereich
* Aufsetzen von Webservices
* Implementierung von zustandslosen Schnittstellen

## Detailierte Ausgabenbeschreibung
### Recherche
Überlegen Sie sich die notwendigen Schritte um unterschiedliche Low-Cost Sensoren an einen Gateway anschließen zu können, um die aquirierten Daten über ein Webservice anzeigen zu lassen.  

Bedenken Sie dabei die folgenden Punkte:
* Abtastrate der Informationen
* Aggregierung der Daten
* Schnittstellendefinition (Hardware, Gateway, Services, etc.)
* Energieversorgung
* Speicherverbrauch
* Verbindung

### Implementierung
Implementieren Sie einen Prototypen, der die oben beschriebenen Punkte realisiert. Verwenden Sie dabei die bereitgestellte Hardware und deployen Sie Ihr Webservice auf eine öffentlich zugängliche Einheit (z.B. Heroku).

## Bewertung
Gruppengrösse: 3-4 Personen  
Protokoll  
Deployment auf Heroku  
### Anforderungen **überwiegend erfüllt**
+ Recherche und Zusammenfassung der verwendeten Technologien
+ Erstellung eines Prototyps zur Aquirierung von Sensordaten
+ Deployment und Dokumentation der grafischen Anzeige der Sensordaten

### Anforderungen **zur Gänze erfüllt**
+ Aufbau des ganzen Systems mit entsprechender Langzeit-Dokumentation
+ Weitere Verwertung der Sensordaten als Export über ReST-Schnittstelle
