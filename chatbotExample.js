//import {Bot, Elements} from 'facebook-messenger-bot';
require('dotenv').config();
const {
    Bot, Elements, Buttons, QuickReplies
} = require("facebook-messenger-bot");
var FBMessenger = require('fb-messenger');
var messenger = new FBMessenger(process.env.PAGE_ACCESS_TOKEN);
var express = require("express");
var weather = require('./js/weatherAPI');





/**
    WIT AI
**/ 
const sessionId = 'dasdasdasd';
var context = {};
var answer = '';

const {Wit, log, interactive, runActions} = require('node-wit');
require('dotenv').config();


const firstEntityValue = (entities, entity) => {
  const val = entities && entities.intent &&
    Array.isArray(entities.intent) &&
    entities.intent[0].entities[entity] &&
    entities.intent[0].entities[entity][0].value

  if (!val)
    return null;

  return typeof val === 'object' ? val.value : val;
};

const actions = {

  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    console.log('user said:  ', request.text);
    console.log('sending:  ', JSON.stringify(response));
    answer = response.text;    //cambiar

    },  

  searchProduct({context, entities}) {
    console.log('\n  MY ENTITY = ' + JSON.stringify(entities));
    return new Promise(function(resolve, reject) {
      var product = firstEntityValue(entities, "product")

      context.result = product;
      return resolve(context);
    });
  },
};


const client = new Wit({accessToken: process.env.WIT_TOKEN, actions});
//interactive(client); //probarlo en consola

//AIT METHOD
/*
client.message(text, {})
    .then((data) => {
      console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));

    }).catch(console.error);*/

/**
    WIT AI
**/ 




function sendToWit(sessionId, messageText, bot) {
    // This will run all actions until nothing left to do
    client.runActions(sessionId, // Current session
        messageText, context // Current session state
    ).then(function (cont) {
       
        console.log('The session state is now: ' + JSON.stringify(cont));
        // Waiting for further messages to proceed.
        if (cont['result']) {
           //reset context or handle context
        }
    }).catch(function (err) {
        console.error('WIT ERROR MSG: ', err.stack || err);
    });
}







const bot = new Bot(process.env.PAGE_ACCESS_TOKEN, process.env.VERIFICATION);

bot.on('message', async message => {
    //console.log(message);
    const {
        sender
    } = message;


    await sender.fetch(`first_name,last_name,profile_pic`, true);
    console.log(`Received a message from ${sender.first_name} with id: ${sender.id}`);

    const {
        text, images, videos, location, audio
    } = message;
    

    if (text) {
    console.log("su texto " +text +"\n\n\n"); // 'hey'
            
        sendToWit(sessionId, text);
        //Text
        let out = new Elements();
        out.add({
            text: answer
        });
        await bot.send(sender.id, out);
    }


    if (images) {
        console.log(images); // ['http://...', 'http://...']
        //await messenger.sendImageMessage(sender.id, images);
    }

    if (videos) {
        console.log(videos); // ['http://...', 'http://...']
    }

    if (location) {
        console.log(location); // {title, long, lat, url}
    }

    if (audio) {
        console.log(audio); // url
    }



    //await Bot.wait(1000);

    /*
    out = new Elements();
    out.add({
        image: sender.profile_pic
    });
    await bot.send(sender.id, out);

    //await Bot.wait(1000);

    let buttons = new Buttons();
    buttons.add({
        text: 'Google',
        url: 'http://google.com'
    });
    buttons.add({
        text: 'Yahoo',
        url: 'http://yahoo.com'
    });
    buttons.add({
        text: 'Bing',
        url: 'http://bing.com'
    });
    out = new Elements();
    out.add({
        text: 'search engines',
        subtext: 'click to get redirected',
        buttons
    }); // add a card
    await bot.send(sender.id, out);

    buttons = new Buttons();
    buttons.add({
        text: 'Call us',
        phone: '3315397492'
    });
    buttons.add({
        share: true
    });
    out = new Elements();
    out.add({
        text: 'ABC Flower shop',
        subtext: 'Office hours 10am - 6pm',
        buttons
    }); // add a card
    await bot.send(sender.id, out);

    out = new Elements();
    out.setListStyle('compact'); // or 'large'
    out.add({
        text: 'Item 1',
        subtext: 'Subtitle'
    }); // add list item
    out.add({
        text: 'Item 2',
        subtext: 'Subtitle'
    }); // add list item
    await bot.send(sender.id, out);

    buttons = new Buttons();
    buttons.add({
        text: 'Google',
        url: 'http://google.com'
    });
    buttons.add({
        text: 'Yahoo',
        url: 'http://yahoo.com'
    });
    out = new Elements();
    out.add({
        image: 'http://google.com/logo.png',
        text: 'hey',
        buttons
    }); // first card
    out.add({
        image: 'http://yahoo.com/logo.png',
        text: 'hey',
        buttons
    }); // second card
    await bot.send(sender.id, out);

    let replies = new QuickReplies();
    replies.add({
        text: 'location',
        isLocation: true
    });
    out = new Elements();
    out.add({
        text: 'Send us your location'
    });*/
    //out.setQuickReplies(replies);
    //await bot.send(sender.id, out);

    //await messenger.sendTextMessage(sender.id, message.text);
    //await messenger.sendHScrollMessage(sender.id, elems);
    //await messenger.sendButtonsMessage(sender.id, message.text,  buttons);
    //await messenger.sendImageMessage(sender.id, "https://pbs.twimg.com/profile_images/789099010749505537/vNRHXVoY_400x400.jpg");
    //await messenger.sendImageMessage(sender.id, sender.profile_pic);
});


const app = express();
app.use('/facebook', bot.router());

app.listen(3000);
console.log("Listo bro");