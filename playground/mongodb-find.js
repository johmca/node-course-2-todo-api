//Create MONGO CLIENT using obect deconstruction
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

  //Read in data from Todos collection using .find() method
  //find() returns a cursor rather than the docs so we also
  //use .toArray() function which returns a Promise so we use .then()
  //Remember .then() takes 2 args
  // i) a callback function when things go well
  //ii) an error function when it goes wrong
  //If we pass no args to find() all docs are returned but if we
  //pass a query object we get a subset of the docs back
  //Note - if queryin gbased on _id we must create an objectID using the
  //objectID fucntion and the string we see in the _id field
  //e.g. 59490b2ae7435922ccbbf252
 //  db.collection('Todos').find({
 //    _id:new ObjectID('59490b2ae7435922ccbbf252')
 //  }).toArray().then((docs)=>{
 //    console.log('Printing in docs');
 //    console.log(JSON.stringify(docs,undefined,2));
 //  },
 // (err)=>{
 //    console.log('Unable to fetch todos',err);
 //  });
 db.collection('Todos').find({
   _id:new ObjectID('59490b2ae7435922ccbbf252')
 }).count().then((count)=>{
   console.log(`There are ${count} docs in the Todos collection`);
 },
(err)=>{
   console.log('Unable to count todos',err);
 });


  //Close connection to Mongodb
  //db.close();
});
