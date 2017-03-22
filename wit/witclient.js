require('dotenv').config();
const sessionId = 'dasdasdasd';
var context = {};
var answer = '';
var actions = require('./actions');

const {Wit, log, interactive, runActions} = require('node-wit');
const client = new Wit({accessToken: process.env.WIT_TOKEN, actions});

interactive(client);

exports.sendToWit = function(sessionId, messageText) {
    // This will run all actions until nothing left to do
    client.runActions(sessionId, // Current session
            messageText, context // Current session state
    ).then(function (context) {
        console.log('The session state is now: ' + JSON.stringify(context));
        // Waiting for further messages to proceed.
        if (context['result']) {
           //reset context or handle context ?? //context 
        }   
    }).catch(function (err) {
        console.error('WIT ERROR MSG: ', err.stack || err);
    });
}


/*
client.message(text, {})
    .then((data) => {
      console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));

    }).catch(console.error);*/





