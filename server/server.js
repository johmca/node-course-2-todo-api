//server.js is the inital program to be run using node command and starts the app

//---------LIBRARY IMPORTS---------------------
var express = require('express'); //Express web server framework
var bodyParser = require('body-parser'); //Parses JSON text to object

//---------LOCAL IMPORTS---------------------
//Load in mongoose from our mongoose.js file using ES6 object destructuring so that we
//have an object called mongoose qual tot he mongoose property
var {mongoose} = require('./db/mongoose.js')

//Load in the Todo and User models
var  {Todo} = require('./models/todo');
var  {User} = require('./models/user');

//Create app as instance of express
var app = express();

//Configure our express middleware with .use()
//body-parser allows us to send json to our express application and
//work with it as if it was an object
app.use(bodyParser.json());

//Create routes using .post()
//.post() takes 2 args i) URL ii) callback function with args req, res
app.post('/todos',(req,res)=>{
  //Create todo as an instance of the todo mongoose model
  var todo = new Todo ({
    text: req.body.text
  });
  //save model to database
  todo.save().then((doc)=>{
    res.send(doc); //Send  doc back to user
  },(e)=>{
      res.status(400).send(e); //Send back status = 400 and send doc back to user
  });
});

//Start server
var port = 3000;
app.listen(port,()=>{
  console.log(`Listening on port ${port}`)
});
