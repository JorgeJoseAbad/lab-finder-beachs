const express = require('express');
const router = express.Router();
const Beachs = require('../models/beach');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Google Sites',
    API_KEY : process.env.API_KEY
   });
});

router.post('/new', function (req, res, next) {
  const newBeach = new Beachs();
  newBeach.name = req.body.name;
  newBeach.flag = req.body.flag;

  Beachs.find({name:newBeach.name}, function(err,beach){
    if (err) {
      console.log(err);
      return next(err);
    }
    console.log(beach);
    if (beach.length === 0){
      //debugger;
      newBeach.save(function (err, beach) {
        if (err) return next(err);
        console.log(beach);
        res.redirect('/');
      });
    } else Beachs.findOneAndUpdate({name:newBeach.name}, {flag: newBeach.flag },function(err,beach){
       if (err) return next(err);
       console.log(beach);
       res.redirect('/')
    })
    //debugger;
  })
});

module.exports = router;
