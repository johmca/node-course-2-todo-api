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

  //Find  one document and update it
  //Accepts args as follows
  // i) Filter (query obect)
  // ii) Updates to make (not so straightforward as must sue MongoDb's own operators e.g. $set, $increment)
  // iii) Return Original? True or False - if you want the updated doc returned set to False
  //Other optional args can be used
  //Returns a promise if callback not passed in
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('59490aebd62e80191ceb06e6')
  // }, {
  //   $set:{
  //     completed: false
  //     }
  //   },{
  //     returnOriginal : false
  //   }).then((result)=>{
  //     console.log(result);
  //   });

  //Challenge - Update a doc in the Users collection - chaneg the name from
  //John to Andrew and Increment the age
  db.collection('Users').findOneAndUpdate(
    {_id: new ObjectID('59490f668c2bfe1d9080f834')
  }, {
    $set:{
      user:'Robbie'
    }, $inc:{
      age: 1
    }
  }, {
      returnOriginal:false
    }).then((result)=>{
  console.log(result);
});


  //Close connection to Mongodb
  //db.close();
});
