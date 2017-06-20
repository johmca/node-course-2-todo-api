//Create MONGO CLIENT
//const MongoClient = require('mongodb').MongoClient;

//Use ES6 "object destructuring" to create new MongoClient object
//Object Destructuring allows us to create a new object
//based on a subset of the properties of another
//here we create a MongoClient object based on the MongoCLient property of mongodb
//Also include ObjectID function which allows us to create new document IDs
//This uses object destructuring to create the new stripped down object
const {MongoClient,ObjectID} = require('mongodb');

//Connect to mongo db via Mongo CLient connect method
// 2 args
// a) URL pointing to location of database
// b) Callback function to fire after connecting (or failing)
//    2 args
//    i) error object
//    ii) db object allowing us to CRUD data from database
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
  if (err) {
    //Note use of return here prevents code below from executing
    //meaning we don't need a messy if then else block
    return console.log('Unable to connect Mongodb server');
  }
  //Confirm connection
  console.log('Connected Mongodb server');

  //Add some data (Note - if the database does not exist it will be created
  //at this time) using the insertOne method of the db.collection object
  //args
  // a) An object containing some data to add to the document
  // b) Callback function fired when db op completed with args
  //    i) error object
  //    ii)result object

  // db.collection('Todos').insertOne({text:'Some Text'},(err,result)=>{
  //   if (err) {
  //     //handle error
  //     return console.log('Unable to insert',err);
  //   }
  //   //confirm success by pretty printing result object
  //   console.log(JSON.stringify(result.ops,undefined,2));
  // });

  //Challenge - add a new doc to Users collection
  // db.collection('Users').insertOne({user:'John', age:50, location:'Glasgow'},
  //   (err,results)=>{
  //     if (err) {
  //       return console.log('Unable to insert document',err)
  //     }
  //   console.log('Document added to Users collection',JSON.stringify(results.ops[0]._id.getTimestamp(),undefined,2))
  //   });

  //Close connection to Mongodb
  db.close();
});
