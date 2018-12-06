// var Gpio = require('onoff').Gpio,
// pir = new Gpio(17, 'in', 'both');
var mail = require('mail.js');

print("sending mail")

mail.sendMail()


/**
pir.watch(function(err, value) {
if (err) exit();
console.log('Intruder detected!');
if(value == 1) sendEmail();
});
*/

print("mail sent")
