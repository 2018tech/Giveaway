const express = require('express');
const path = require('path');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var session = require('express-session');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var auth = require("./routes/auth");

var User = require('./models/models').User;
var Item = require('./models/models').Item;
var Location = require('./models/models').Location;
var Message = require('./models/models').Message;
var Accept = require('./models/models').Accept;

const app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
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

// passport localstrategy
passport.use(new LocalStrategy(function(username, password, done) {
  // Find the user with the given username
  User.findOne({ username: username }, function (err, user) {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
      return done(err);
    }
    // if no user present, auth failed
    if (!user) {
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

app.post('/postitem', async function(req, res){
  const user = await User.findById(req.user._id)
  var newitem = new Item({
    name: req.body.name,
    description: req.body.description
    })
  var item = await newitem.save()
  user.items.push(item)
  const saveduser = await user.save()
  res.send(saveduser)
})

app.get('/collection', async function(req, res){
  const user = await User.findById(req.user._id).populate("items")
  var items = user.items
  res.send(items)
});


app.get('/currentUserMessage', async function(req, res){
  const user = await User.findById(req.user._id).populate("messages")
  var messages = user.messages
  res.send(messages)
});

app.get('/acceptedRequests', async function(req, res){
  const user = await User.findById(req.user._id).populate("accepts")
  var accepts = user.accepts
  res.send(accepts)
})

// DO NOT REMOVE THIS LINE :)
app.get('/', function (req, res) {
  var port = server.address().port;

  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 1337);
