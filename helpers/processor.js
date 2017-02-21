"use strict";
const rp = require('request-promise');

class Processor {

  generateImageOptions(responseObject){

      return {
        attachment: {
          type: "image",
          payload: {
            url: responseObject.data[0].images.original.url,
          }
        }
      }
  }

  generateCarouselleOptions(responseObject, n){
    var elems = [];
    for (var i = 0; i < n; i++) {
        elems.push({
          title: responseObject.data[i].images.original.url,
          subtitle: "gifs",
          item_url: responseObject.data[i].images.original.url,
          image_url: responseObject.data[i].images.original.url,
          buttons: [{
            type: "web_url",
            url: responseObject.data[i].images.original.url,
            title: "Open Web "
          }]
        })
      }

      var carouselleOptions = {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: elems
          }
        }
      }
      //console.log(carouselleOptions);

      return carouselleOptions;
  }

    generateCarouselleTEST(responseObject, n){
      return {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "rift",
            subtitle: "Next-generation virtual reality",
            item_url: "https://www.oculus.com/en-us/rift/",               
            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "touch",
            subtitle: "Your Hands, Now in VR",
            item_url: "https://www.oculus.com/en-us/touch/",               
            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/touch/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    };
  }

  getResponse(data){
    var input = data.entry[0].messaging[0].message.text;

    var options = {
      uri: 'http://api.giphy.com/v1/gifs/search',
      qs: {
          api_key: 'dc6zaTOxFJmzC',
          q: input
      },
      method: 'GET',
      json: true // Automatically parses the JSON string in the response
    };
    return rp(options);
  }

  setOptions(json){
    var options = {
      uri: `${fbGraph}/me/messages`,
      qs: {
        access_token: fbToken
      },
      method: 'POST',
      json: json
    }
    return options
  }
}


module.exports = new Processor();
