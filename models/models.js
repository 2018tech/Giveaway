var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var messageSchema = new mongoose.Schema({
  user: String,
  item: String,
  messagefrom: String,
  hour: Number,
  minutes: Number,
  amorpm: String,
  month: String,
  date: Number
});

var userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: {type: String, unique: true},
  password: String,
  items: [{type: mongoose.Schema.ObjectId, ref: 'Item'}],
  locations: {type: mongoose.Schema.ObjectId, ref: 'Location'},
  messages: [{type: mongoose.Schema.ObjectId, ref: 'Message'}],
  accepts: [{type: mongoose.Schema.ObjectId, ref: 'Accept'}]
});

var itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  value: Number
});

var locationSchema = new mongoose.Schema({
  stations: String,
  position: Array,
  yourshopname: {type: String, unique: true}
  });

var acceptSchema = new mongoose.Schema({
  accepts: String
});

  module.exports = {
    User: mongoose.model('User', userSchema),
    Item: mongoose.model('Item', itemSchema),
    Location: mongoose.model('Location', locationSchema),
    Message: mongoose.model('Message', messageSchema),
    Accept: mongoose.model('Accept', acceptSchema)
  };
