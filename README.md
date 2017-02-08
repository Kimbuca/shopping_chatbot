# shopping_chatbot
Admin de Proy Ingeniería de SW

Chatbot en Messenger que mantiene conversaciones con el usuario para realizar busquedas filtradas de productos dentro de Amazon  

## API's
* Amazons "Product Advertising API" para realizar y obtener resultados desde el catalago de Amazon
* Amazons "Rekognition" para el reconocimiento de imagenes
* Wit.AI para realizar el procesamiento del lenguaje natural del usuario desde el chat.

## Steps
* Install npm packages
```
npm install
```

* Start your node server in your proyect folder
```
node server.js
```
* Start ngrok and copy your public URL (Ex: https://b7b75123.ngrok.io --> localhost: 3000)
```
ngrok http 3000
```
* Configure your facebook Developer account at: https://developers.facebook.com/
** Configure your webhook using your public ngrok URL adding "/webhook/facebook" at the end.
** use "VerifyMe" to verify your webhook and wait to the "OK"
** Go to your APP and generate your TOKEN
** Subscribe your webhook to your fan page
** Talk to your ChatBot :D!



