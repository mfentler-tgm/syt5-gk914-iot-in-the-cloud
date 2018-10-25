# Sending Mails on the raspi

Um Nachrichten vom Rapsberry Pi zu senden wird das Modul "node_mailer" verwendet.  
Das holt man sich mit dem Befehl:

	npm install nodemailer
Das Grundgerüst des Programms wurde von w3schools entnommen. (Siehe Link [1]). Hier wird für die Emailübertragung Gmail verwendet.

Die Methode __nodemailer.createTransport__ enthält die Syntax für die Verbindung mit Gmail.

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'shittingPreventionAgent@gmail.com',
			pass: 'NoShittingAnymore'
		},
		tls: {
			rejectUnauthorized: false
		}
	});
Als nächstes gibt man in den MailOptions alle Informationen für die Email an. Hier ist der Empfänger noch hardgecoded. Das kann man dann im weiteren durch Command-Line Args ersetzen.

Um die Nachrichten dann zu senden wird die Funktion sendMail() verwendet.

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	}); 

Da OWA ein Certificat verlangt, wird zuerst beim Versuch eine E-Mail zu schreiben ein Fehler auftreten. Diesen umgeht man, in dem man folgende Zeilen in die createTransport Funktion einfügt [2]:  

	tls: {
		rejectUnauthorized: false
	}

## Sources
[1] https://www.w3schools.com/nodejs/nodejs_email.asp  
[2] https://github.com/nodemailer/nodemailer/issues/406  