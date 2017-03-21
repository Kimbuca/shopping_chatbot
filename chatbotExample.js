//import {Bot, Elements} from 'facebook-messenger-bot';
require('dotenv').config();
const {
    Bot, Elements, Buttons, QuickReplies
} = require("facebook-messenger-bot");
var FBMessenger = require('fb-messenger');
var messenger = new FBMessenger(process.env.PAGE_ACCESS_TOKEN);
var express = require("express");
var weather = require('./js/weatherAPI');
var amazon = require('amazon-product-api');
var client = amazon.createClient({
    awsId: "AKIAJUBD2COYKEODWYDA",
    awsSecret: "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",
    awsTag: "shopp02b-20"
});
var hey = {};

const bot = new Bot(process.env.PAGE_ACCESS_TOKEN, process.env.VERIFICATION);

bot.on('message', async message => {
    //console.log(message);
    const {
        sender
    } = message;

    /*
    await weather(message.text, function (currentWeather) {
                console.log(currentWeather);
            });
    */



    await sender.fetch(`first_name,last_name,profile_pic`, true);
    console.log(`Received a message from ${sender.first_name} with id: ${sender.id}`);
    const {
        text, images, videos, location, audio
    } = message;

    //Wit ai process identify

    if (text) {
        console.log(text);
        //Text
        let out = new Elements();
        /*out.add({
            text: `hey ${sender.first_name}, how are you!`
        });*/
        out.add({
            text: JSON.stringify(hey, null, 2) + " SIMON"
        })
        await bot.send(sender.id, out);
        client.itemSearch({
            keywords: 'Call of duty',
            searchIndex: 'VideoGames',
            responseGroup: 'ItemAttributes,Offers,Images',
            domain: 'webservices.amazon.com.mx'
        }, function (err, results, response) {
            if (err) {
                //console.log(err);
                console.log(JSON.stringify(err, null, 2));
            } else {            
                console.log(results[0].ItemLinks[0].ItemLink[1].Description); // products (Array of Object)
                console.log(results[0].ItemLinks[0].ItemLink[1].URL); // products (Array of Object)
                console.log(results[0]);
                console.log("RESPUESTA: ");
                //console.log(JSON.stringify(response[0],null,2)); // response (Array where the first element is an Object that contains Request, Item, etc.)
                let out = new Elements();
                /*out.add({
                    text: `hey ${sender.first_name}, how are you!`
                });*/
                out.add({
                    text: JSON.stringify(results[0].DetailPageURL, null, 2)
                })
                bot.send(sender.id, out);


            }
        });



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


    /*
        //await Bot.wait(1000);

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
        });
        out.setQuickReplies(replies);
        await bot.send(sender.id, out);
        
        */

    //await messenger.sendTextMessage(sender.id, message.text);
    //await messenger.sendHScrollMessage(sender.id, elems);
    //await messenger.sendButtonsMessage(sender.id, message.text,  buttons);
    //await messenger.sendImageMessage(sender.id, "https://pbs.twimg.com/profile_images/789099010749505537/vNRHXVoY_400x400.jpg");





    //await messenger.sendImageMessage(sender.id, sender.profile_pic);
});


const app = express();
app.use('/facebook', bot.router());

app.listen(3030);
console.log("Listo bro");