const Router = require('express').Router;
const router = new Router();
//Import fb contr
const facebookController = require('./controllers/facebook');

// router.post('/messageDispatcher', dispatcher.enqueue);

router.get('/', (req, res) => {
  res.json({message: 'I\'m a bot'});
})

//EndPoints for facebook
//Get is used for subscribe/Verification;
router.get('/webhook/facebook',facebookController.getWebhook);
//Post is used to recive message
router.post('/webhook/facebook',facebookController.postWebhook);

module.exports = router;
