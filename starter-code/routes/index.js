var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Google Sites',
    API_KEY : process.env.API_KEY
   });
});

module.exports = router;
