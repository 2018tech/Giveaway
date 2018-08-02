
var express = require('express');
var router = express.Router();
var models = require('../models/models');
var LocalStrategy = require('passport-local');
var bodyParser = require('body-parser');


module.exports = function(passport) {


  router.post('/register', function(req, res) {
    // validation step
    console.log(req.body)
    var u = new models.User({
      username: req.body.username,
      password: req.body.password,
    });
    u.save(function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).json({err: err.message});
        return;
      }
      console.log(user);
      res.status(200).json({success: true});
    });
  });


  // POST Login page
  // router.post('/login', function(req, res, next){
  //   console.log(req.body)
  //   passport.authenticate('local', function(err, user,info){
  //     console.log(err, user, info);
  //     if(err) {
  //       res.status(400).send({'err': err});
  //     } else {
  //       res.json({sucess: true});
  //     }
  //   })(req, res, next)
  //
  // })


  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send("User logged in");
  })


  router.get('/currentUser', (req, res) => {
      if (!req.user) {
        throw 'error'
      }else{
        res.send(req.user)
      }
    })


  // GET Logout page
  router.get('/logout', function(req, res) {
    req.logout();
    res.json({sucess: true});
  });

  return router;
};
