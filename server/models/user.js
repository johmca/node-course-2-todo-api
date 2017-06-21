//Define the mongoose model for User collection here

//Load in mongoose
var mongoose = require('mongoose');

//Define User model
var User = mongoose.model('User',{
  user:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    trim: true,
    minlength:1
  }
});

//Export the User model (User property = User variable (model in this case))
module.exports = {User};
