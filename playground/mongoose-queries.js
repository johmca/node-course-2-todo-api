//Some examples of different query functions avialable with mongoose
//
//See mongoose.com/docs and look at queries for more

//Load mongoose (just the bit we need)
const {mongoose} = require('./../server/db/mongoose');

//Load Todo and User mongoose models
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Load objectID from MongoDb - it contains useful methods
//such as _Id validation
const{ObjectId} = require('mongodb');



//Note - with Mongoose we don't need to convert the _id
//to an objectID ourselves - it does it for us
// var id = '594cf42581e4c84c227ca326111';
// if (!ObjectId.isValid(id)) {
//   return console.log('Object ID provided is not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos)=>{
//   console.log('Todos =find',todos)
// });
//
// //Use fidnOne() to bring back a single doc
// //Note todo not an array called todos
// var id = '594cf42581e4c84c227ca326';
// Todo.find({
//   _id: id
// }).then((todo)=>{
//   console.log('Todo fineOne=',todo)
// });

//Use findById() to bring back a single doc based on _id
//Note todo not an array called todos
// var id = '594cf42581e4c84c227ca326';
// Todo.findById(id).then((todo)=>{
//   if (!todo) { //If document id not found return message to console
//     return console.log('ID not found!');
//   }
//   console.log('Todo findByID =',todo);
// }).catch((e)=>console.log('Printing error',e)); //If _Id is invalid (wrong format) then catch error and output to console


//CHALLENGE....
//Find a user doc based on its _id and handle errors
var userDocId = '594a73aee082d8e43f2dc15a';

User.findById(userDocId).then((user)=>{
  if (!user) {
    return console.log('User id not found for id=',userDocId);
  }
  console.log('User id is found',user);
},(e)=>console.log('Invalid user ID',e));
