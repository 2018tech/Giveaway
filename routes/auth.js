
var express = require('express');
var router = express.Router();
var models = require('../models/models');
var bodyParser = require('body-parser');
var passport = require('passport');
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google'
};
var geocoder = NodeGeocoder(options);

module.exports = function(passport) {

  router.post('/register', function(req, res) {

    var u = new models.User({
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname
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

  router.post('/location', async function(req, res) {
    // var u = new models.User({
    //   yourshopname: req.body.yourshopname,
    //   street: req.body.street,
    //   city: req.body.city,
    //   state: req.body.state,
    //   zipcode: req.body.zipcode
    // });
    console.log('before await')
    var geoconvert;
     await geocoder.geocode(`${req.body.street} ${req.body.city} ${req.body.state} ${req.body.zipcode}`,
      function(err, res) {
       geoconvert = new models.Location({
            "type": "Feature",
            "properties": {
              "place": "Your Shop",
              "login": "",
              "lat": `${res[0].latitude}`,
              "lon": `${res[0].longitude}`
            },
            "geometry": {
              "point": "Point",
               "coordinates": [
                res[0].longitude,
              res[0].latitude
           ]
            }
          })
      })
      geoconvert.save(function(err, user) {
        if (err) {
          console.log(err);
          res.status(500).json({err: err.message});
          return;
        }
        res.status(200).json({
        location: geoconvert});
      })
    })

    router.get('/usershop', function(req,res){
      models.Location.find({})
      .then( (loc) =>  {
        console.log('sends res', loc)
        console.log('SEND!!!')
        res.json(loc)
      })
      // (function(err, res){
      //   if (err){
      //     console.log(err);
      //     return {err}
      //   }else
      //   console.log('INSIDE USERSHOP');
      //   // res.json(res)
      // })
    })


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
