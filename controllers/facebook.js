const request = require('request');
const processor = require('../helpers/processor');
const controller = (function () {
    //Secret used by  FB to validate that this webhook is yours!
    var verifyToken = "VerifyMe";


    return {
        getWebhook: function (req, res) {
            console.log(req.query);

            if (req.query['hub.mode'] === 'subscribe' &&
                req.query['hub.verify_token'] === verifyToken) {
                console.log("Validating webhook");
                res.status(200).send(req.query['hub.challenge']);
            } else {
                console.log(req.query['hub.verify_token']);
                console.error("Failed validation. Make sure the validation tokens match.");
                res.sendStatus(403);
            } //
        },
        obtainCommand: function (witResponse) {
            forEach.witResponse(function () {

            })
        },
        postWebhook: function (req, res) {
            var data = req.body;
            console.log(JSON.stringify(data, null, 2));

            if (data.object === 'page') {

                //Obtain user Input.
                var userInput = data.entry[0].messaging[0].message.text;
                console.log(userInput);
                var recipientID = data.entry[0].messaging[0].sender.id;
                console.log(recipientID);
                //Manage input with Wit

/*
                processor.getResponse(data)
                    .then(response => {
                        var payload = {};
                        //payload.message = processor.generateImageOptions(response);
                        payload.message = processor.generateCarouselleOptions(response, 3);
                        payload.recipient = {
                            id: data.entry[0].messaging[0].sender.id
                        };
                        //console.log(payload);
                        console.log('Aqui ando');
                        sendTextMessage(data.entry[0].messaging[0].sender.id, payload.message)
                            //callSendAPI(payload);
                    })
                    .catch(err => {
                        console.log(err);
                    })
*/
                
                var messageData = {
                  recipient: {
                    id: recipientID
                  },
                  message: {
                    text: userInput
                  }
                };
                callSendAPI(messageData);
                
                res.sendStatus(200);
            }

        }
    }
}());

function receivedMessage(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    console.log("Received message for user %d and page %d at %d with message:",
        senderID, recipientID, timeOfMessage);
    console.log(JSON.stringify(message));

    var messageId = message.mid;

    var messageText = message.text;
    var messageAttachments = message.attachments;

    if (messageText) {

        // If we receive a text message, check to see if it matches a keyword
        // and send back the example. Otherwise, just echo the text we received.
        switch (messageText) {
            default: sendTextMessage(senderID, messageText);
        }
    } else if (messageAttachments) {
        sendTextMessage(senderID, "Message with attachment received");
    }
}

function sendTextMessage(recipientId, message) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message
        /*message: {
          text: messageText
        }*/
    };

    callSendAPI(messageData);
}

function callSendAPI(messageData) {
    console.log(JSON.stringify(messageData, null, 2));
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: "EAAIZBZASCkVw0BAJTNplMNPLHFphACPI1N2WVCSyW1aH1KwmfkQCZCn5ZBt5FjMmWWYfodduitbhxlokxSjRrx3kIMxMJXasZASwFrht2bp5567H8bUKHY2BDy3S8dJylaDlSCwiARPrGc3ciaF18ZCCZBuRIwy5dwjXcAXLKVl7wZDZD"
        },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            console.log("Successfully sent generic message with id %s to recipient %s",
                messageId, recipientId);
        } else {
            console.error("Unable to send message.");
            //console.error(response);
            console.error(error);
        }
    });
}

//Export as a module
module.exports = controller;