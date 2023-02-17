const c = require('chalk')
const notifier = require('node-notifier');

module.exports = Logger = {
    dateTimePad: function (value, digits) {
        let number = value;
        while (number.toString().length < digits) {
            number = "0" + number;
        }
        return number;
    },

    format: function (tDate = new Date(Date.now())) {
        return this.dateTimePad(tDate.getHours(), 2) + ":" +
            this.dateTimePad(tDate.getMinutes(), 2) + ":" +
            this.dateTimePad(tDate.getSeconds(), 2);
    },
    log: function (tolog, options = null) {
        notifier.notify({
            title: 'sup',
            message: tolog,
            icon: '../mari.png',
            sound: true,
            wait: false,
            appID: " "
        });
        if (!options) {
            console.log(`[${this.format()}] ` + c.blue(`[LOG]`) + " || [ " + c.blue('/') + " ] " + tolog)
        } else {
            console.log(c.cyan(`[LOG] ${this.format()}- ${tolog}`), options)
        }
    },
    success: function (tolog, options = null) {
        notifier.notify({
            title: 'sup',
            message: tolog,
            icon: '../mari.png',
            sound: true,
            wait: false,
            appID: " "
        });
        if (!options) {
            console.log(`[${this.format()}] ` + c.blue(`[LOG]`) + " || [ " + c.green('+') + " ] " + tolog)
        } else {
            console.log(c.cyan(`[LOG] ${this.format()}- ${tolog}`), options)
        }
    },
    error: function (tolog, options = null) {
        notifier.notify({
            title: 'tawk taker',
            message: tolog,
            icon: '../assets/mari.png',
            sound: true,
            wait: false,
            appID: " "
        });
        if (!options) {
            console.log(`[${this.format()}] ` + c.blue(`[LOG]`) + " || [ " + c.red('-') + " ] " + tolog)
        } else {
            console.log(c.cyan(`[LOG] ${this.format()}- ${tolog}`), options)
        }
    }
}