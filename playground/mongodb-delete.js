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

  //Delete many docs function deletes all docs matching the query object
  //It returns a promise so we can use .then() which of course has 2 args
  // i) Success function ii) Failure funciton (optional and not used here)
  // db.collection('Todos').deleteMany({text:'Get lunch'}).then((result)=>{
  //   console.log(result);
  // });

  //Delete one docs
  // db.collection('Todos').deleteOne({text: 'Get lunch'}).then((result)=>{
  //   console.log(result);
  // });

  //Find one doc, return values and delete
  //returns the document to the promise
  // db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
  //   console.log(result);
  // });

  //Challenge - delete all docs from Users colelction with name: 'John'
  db.collection('Users').deleteMany({user:'John'}).then((result)=>{
    console.log('Documents deleted',result);
  },(err)=>{
    console.log('Documents not deleted', err);
  });

  //Challenge - delete a document by ObjectID
  db.collection('Users').deleteOne({_id:new ObjectID('59490cbd9c1f533900020b4f')}).then((result)=>{
    console.log('Documents deleted',result);
  });

  //Close connection to Mongodb
  //db.close();
});
