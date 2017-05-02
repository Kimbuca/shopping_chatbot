module.exports = {

  send(request, response) {
    const {sessionId, context, entities} = request;

    //console.log("CONTEXXXX ", request.entities.intent);
    const {text, quickreplies} = response;
    console.log('user said:  ', request.text);
    console.log('sending:  ', JSON.stringify(response));
    answer = response.text;    //cambiar
    return new Promise(function(resolve, reject) {
      resolve(answer);
    }
  },  

  searchProduct({context, entities}) {
    console.log('\n  MY CONTEX = ' + JSON.stringify(context));
    console.log('\n  MY ENTITY = ' + JSON.stringify(entities));
    return new Promise(function(resolve, reject) {
      var product = firstEntityValue(entities, "product");
      context.result = product;
      return resolve(context);
    });
  }
};


//Search for an especific entity in a subset of entities
const firstEntityValue = (entities, entity) => {
  const val = entities && entities.intent &&
    Array.isArray(entities.intent) &&
    entities.intent[0].entities[entity] &&
    entities.intent[0].entities[entity][0].value

  if (!val)
    return null;
  return typeof val === 'object' ? val.value : val;
};


//completa para developers con servicios