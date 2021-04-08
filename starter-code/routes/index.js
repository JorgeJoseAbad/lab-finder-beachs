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
      return next(err);
    }
    if (beach.length === 0){
      newBeach.save(function (err, beach) {
        if (err) return next(err);
        res.redirect('/');
      });
    } else Beachs.findOneAndUpdate({name:newBeach.name}, {flag: newBeach.flag },function(err,beach){
       if (err) return next(err);
       res.redirect('/')
    })

  })
});

router.get('/beach',function(req,res,next){
   const nameBeach = req.query.placeName;
   Beachs.findOne({name:nameBeach},function(err,beach){
     if (err) return next(err);
     else if (beach === null){
       res.send(null);
     }
     else {
       return res.send(beach); //no redirigimos directamente
     }
   })

})

module.exports = router;
