var express = require('express');
var router = express.Router();
var models = require('../models/models');
var bodyParser = require('body-parser');
var passport = require('passport');
var NodeGeocoder = require('node-geocoder');
var Message = models.Message;

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
    var geoconvert;
    await geocoder.geocode(`${req.body.street} ${req.body.city} ${req.body.state} ${req.body.zipcode}`,
      function(err, res) {
        geoconvert = new models.Location({
          stations: `${req.user._id}`,
          position: [res[0].longitude, res[0].latitude],
          yourshopname: `${req.body.yourshopname}`,
        })
      })
      geoconvert.save(function(err, user) {
        if (err) {
          console.log(err);
          res.status(500).json({err: err.message});
          return;
        }else{
          models.User.findByIdAndUpdate(req.user._id, {locations: user._id})
          .then(function(){
            res.send({success: true})
          })
          .catch(err=> console.log(err))
        }
      })
    })

    router.get('/usershop', function(req, res){
      models.User.find({}).populate('locations').populate('items')
      .exec()
      .then((loc) => res.json(loc))
      .catch(err => console.log(err))
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

    // router.get('/currentUserMessage', (req, res) => {
    //   if (!req.user){
    //     throw 'error'
    //   }else{
    //     models.User.findById(req.user._id)
    //     .then(user=> res.send(user))
    //   }
    // })

    router.post('/timesubmit', (req, res) => {
      models.Location.findOne({yourshopname: req.query.id}).then(location=>{
        models.User.findById(location.stations).then(async user=>{
          var newMessage = new Message({
            user: req.user._id,
            messagefrom: req.user.username,
            item: req.body.item,
            hour: req.body.hour,
            minutes: req.body.minutes,
            amorpm: req.body.amorpm
          })
          var messageToPush = await newMessage.save();
          user.messages.push(messageToPush);
          await user.save();
        })
      })
    })

    router.delete('/itemdelete', (req, res) => {
      var id = req.query.id;
      models.Item.findOneAndRemove({_id: id}).then(
        res.send("success")
      )
    });

    router.delete('/messagedelete', (req, res) => {
      var id = req.query.id;
      console.log(id);
      models.Message.findOneAndRemove({_id: id}).then(
        res.send("success")
      )
    });

    router.get('/logout', function(req, res) {
      req.logout();
      res.json({sucess: true});
    });

    return router;
  };
