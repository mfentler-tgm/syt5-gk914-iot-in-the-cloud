
import { startServer } from './webserver'
import { sendMail } from './mail'

// var Gpio = require('onoff').Gpio,
// pir = new Gpio(17, 'in', 'both');

/**
pir.watch(function(err, value) {
if (err) exit();
console.log('Intruder detected!');
if(value == 1) sendEmail();
});
*/

startServer()

