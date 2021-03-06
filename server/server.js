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

//Create routes .................

// POST /todos route
//Use app.post() to register route handler
//.post() takes 2 args i) URL ii) callback function with args req, res
app.post('/todos',(req,res)=>{
  //Create todo as an instance of the todo mongoose model
  var todo = new Todo ({
    text: req.body.text
  });
  //save mongoose model to database
  todo.save().then((doc)=>{
    res.send(doc); //Send  doc back to user
  },(e)=>{
      res.status(400).send(e); //Send back status = 400 and send doc back to user
  });
});

// GET /todos route to return all todo docs
//Use app.get() to register route handler
// .get() takes 2 args i) URL ii) callback function with args req, res
app.get('/todos',(req,res)=>{
  //Use mongoose .find() method experted from todo model and define promise
  //callback
  Todo.find().then((todos)=>{
    res.send({todos}); //Send the todos back to client as part of an object
  },(e)=>{
    res.status(400).send(e);
  });
});


//Start server
var port = 3000;
app.listen(port,()=>{
  console.log(`Listening on port ${port}`)
});

//Export the app from this module
module.exports = {app}; //ES6 syntax - set app property of the exported
                        //object to the app variable in this file
