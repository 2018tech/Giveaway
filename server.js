const express = require('express');
const path = require('path');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
var session = require('express-session');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var auth = require("./routes/auth");

var User = require('./models/models').User;
var Item = require('./models/models').Item;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
// passport strategy
passport.use(new LocalStrategy(function(username, password, done) {
  // Find the user with the given username
  console.log('hi');
  User.findOne({ username: username }, function (err, user) {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
      console.log(err);
      return done(err);
    }
    // if no user present, auth failed
    if (!user) {
      console.log(user);
      return done(null, false, { message: 'Incorrect username.' });
    }
    // if passwords do not match, auth failed
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    // auth has has succeeded
    return done(null, user);
  });
}
));

app.use(auth(passport))
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

app.post('/postitem', function(req, res){
  new Item({
    name: req.body.name,
    description: req.body.description,
    value: req.body.value,
    location: req.body.location, 
    time: req.body.time,
  })
  .save(function(err, doc) {
    if (err) {
      console.log(err);
      res.status(500).json({err: err.message});
      return;
    }
    res.status(200).json({success: true, doc: doc});
  })
})
//homepage all the items
// app.get('/home', function(req, res){
//   Item.find({}, (err, documents) => {
//     if (err) res.status(500).end(err.message)
//     else res.json(documents)
//   })
// });
// //profile pagee
// app.get('/profile', function(req, res){
//   User.findById(req.query.id, (err, doc) => {
//     if (err) res.status(500).end(err.message)
//     else res.json(doc)
//   })
// })
//
// //collection PAGE!
// app.get('/collection', function(req, res) {
//   Item.findById(req.query.id, (err, doc) => {
//     if (err) res.status(500).end(err.message)
//     else res.json(doc)
//   });
// });
//
// //trade history
// app.delete('/item/:id', function(req, res) {
//   if (req.user === user){
//     res.send('DELETE REQUEST')
//   }
// });
// //
// // app.use(function(req, res, next) {
// //   var err = new Error('Not Found');
// //   err.status = 404;
// //   next(err);
// // });
//
// app.get('/ping', function (req, res) {
//  return res.send('pong');
// });

// DO NOT REMOVE THIS LINE :)
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 1337);
