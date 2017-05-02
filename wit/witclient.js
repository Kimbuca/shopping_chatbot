require('dotenv').config();

const {Wit, log} = require('node-wit');
const client = new Wit({accessToken: process.env.WIT_TOKEN});


const getIntent = (entity) => {
    return entity.entities.intent[0].value;
}

//used to extract individual entities 'product', 'price'
const specifiedEntityValue = (set, entity) => {

  var val = null;
  try{ 
        val = set.entities.intent[0].entities[entity][0].value
  }catch(e){
    if (e instanceof TypeError) {
        return null;
    }
  }
  if (!val)
    return null; 

  return typeof val === 'object' ? val.value : val;
};

exports.sendToWit = function(message){

    return new Promise(function(accept, reject){
        client.message(message, {}) //se le pasa el contexto
        .then((data) => {

            let product = specifiedEntityValue(data, "product");

            if(!product){
                let intent = getIntent(data);
                accept({intention: intent});
                return;
            }else{
                accept({intention: "search", product: product});
                return;
            }
        })
        .catch(err => {
            reject(err);
        })
    });
}



