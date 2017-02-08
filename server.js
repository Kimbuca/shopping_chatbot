const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

//botChatTestCrashCourse
//FB page ID: 252519938497918
//Acces_Token: EAAIZBZASCkVw0BAMcweIAngpcIlZCixKmFZBRRFCm67OOyJy1bM9Cq1sN96z0rQ8Rq4XDtEw6uOmonMbu5WqilgHzxVgw0m2QAIjhVIiZBlwDwWeG15EnawXfXJgKkeosyxpMXpRWWpGCMSnu0iUqYqeajTWljT33Etg7mBgb9AZDZD


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(3000, () => {
  console.log('Bot up & running!');
})
