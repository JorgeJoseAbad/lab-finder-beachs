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
   debugger;
  Beachs.find({name:newBeach.name}, function(err,beach){
    if (err) {
      console.log(err);
      return next(err);
    }
    console.log(beach);
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
   console.log("hi there!!");
   const nameBeach = req.query.placeName;
   Beachs.findOne({name:nameBeach},function(err,beach){
     if (err) return next(err);
     else if (beach === null){
       console.log("no hay playa, vaya vaya!!")
       res.send(null);
     }
     else {
       console.log(beach);
       return res.send(beach); //no redirigimos directamente
     }
   })

})

module.exports = router;
