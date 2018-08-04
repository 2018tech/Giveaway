var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var userSchema = new mongoose.Schema({
  username:
  {type: String,
  unique: true},
  password: String,
  yourshopname: String,
  street: String,
  city: String,
  state: String,
  zipcode: Number,  
  items: [{type: mongoose.Schema.ObjectId, ref: 'Item'}]
});

var itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  value: Number,
  // location: [Number, Number],
  // time: String,
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
