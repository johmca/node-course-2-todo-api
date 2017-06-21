//Define mongoose model for Todo collection here

//Load in mongoose
var mongoose = require('mongoose');

//Define Todo model
var Todo = mongoose.model('Todo',{
  text:{
    type : String, //enforce type check
    required : true, //mandatory entry
    minlength : 1, //must be at least 1 char long
    trim : true //whitepace at start and end removed automatically
  },
  completed:{
    type : Boolean, //enforce type check
    default : false //default value is false
  },
  completedAt:{
    type : Number, //type check
    default : null //default to null
  }
});

//Export the Todo mdoel (Todo property = Todo variable (model in this case))
module.exports = {Todo};
