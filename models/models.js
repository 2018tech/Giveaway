var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var userSchema = new mongoose.Schema({
  username:
  {type: String,
  unique: true},
  password: String,
  items: []
});

var itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  value: Number,
  location: [Number, Number],
  time: String,
  user: {type: mongoose.Schema.ObjectId, ref: 'User'},
});

var tradeSchema = new mongoose.Schema({
  status: String,
  itemfrom: String,
  itemto: String,
  location: [Number, Number],
  time: String
})

module.exports = {
  User: mongoose.model('User', userSchema),
  Item: mongoose.model('Item', itemSchema),
  Trade: mongoose.model('Trade', tradeSchema)
};
