//Keep our mongoose stuff here

//Load mongoose - this is a NPM library we cna use instead of the MongoDb API
//Its a bit more fucntional
var mongoose = require('mongoose');

//Need to tell mogoose to use its own inbuilt promise library
mongoose.Promise = global.Promise;

//Connect to the database
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
