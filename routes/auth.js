
var express = require('express');
var router = express.Router();
var models = require('../models/models');
var bodyParser = require('body-parser');
var passport = require('passport');


module.exports = function(passport) {

  router.post('/register', function(req, res) {

    var u = new models.User({
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname
      // yourshopname: req.body.yourshopname,
      // street: req.body.street,
      // city: req.body.city,
      // state: req.body.state,
      // zipcode: req.body.zipcode
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

  router.post('/location', function(req, res) {

    var u = new models.User({
      yourshopname: req.body.yourshopname,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode
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



  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send("User logged in");
  })

  router.get('/currentUser', (req, res) => {
      if (!req.user) {
        throw 'error'
      }else{
        models.User.findById(req.user._id)
        .then(user=>res.send(user))
      }
    })

  router.get('/logout', function(req, res) {
    req.logout();
    res.json({sucess: true});
  });



  return router;
};
