//Test cases will go here
//Pakage.json scripts modified to call these
//test - describes how the tests wil be run end to end
//test-watch describes how the tests are run via nodemon
//
//To run test suite use "npm run test-watch"

//Require our test modules
//Note that mocha and nodemon do not need to be loaded
//in as that is not how they are used
const expect = require('expect');
const request = require('supertest');

//Load in local files
//Note use of ./.. this puts us backup a directory

//Create a local varibale called app based on the exported
//app property from server.js (ES6 object deconstruction)
const {app} = require('./../server');

//Create local variable called Todo based on exported Todo
//from todo.js (its a mongoose model)
const {Todo} = require('./../models/todo');

//Define array of docs to use in setting up inital database
//state for testing
const todosarray =[
  {text:'Todo test doc'},
  {text:'Todo test doc'},
];

//The tests beow assume the database is in an initial state before running
//Use beforeEach() to set up initial state of database expected by
//our tests
//beforeEach() runs before each test case and only completes
//when we call done()
beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todosarray);
  }).then(()=>done());
});

//Now use describe() blocks to group our test cases logically
//describe() take 2 args i) description of block ii) callback function
//containing our unit tests
describe('POST /todos',()=>{
  //Define our unit tests using .it()
  //.it() takes 2 args i) description ii) callback function containing
  //our test assertions (note use of Done)
  it('should create a Todo',(done)=>{
    var text = 'Test Todo text';
    //Use supertest's request() to send our HTTP message
    //Use POST, direct to /todos endpoint and send an object (supertest will
    //handle conversion to JSON)
    request(app)
      .post('/todos')
      .send({text})
      .expect(200) //expect response code 200
      .expect((res)=>{ //expect response body text to be same as our variable called text
        expect(res.body.text).toBe(text);
      })
      .end((err, res)=>{ //Pass function into end() with errors and response
        if (err) { //If error exists pass it to done() and return
          return done(err);
        }
        //Get Todo docs from database to confirm that test one has been added
        //Use .find() from mongoose with no query object (return all)
        //Code up .then() to expect our todo doc to exist
        Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1); //Expect a single record which we added
          expect(todos[0].text).toBe(text); //Expect the todo to have our own text
          done(); //complete the test
        }).catch((e)=>done(e)) //Catch errors and pass into done() using statement syntax
      });
  });
  //CHALLENGE.......
  //New test case starts here to check that Todo is not corrected when bad data
  //is sent to the server
  it('should not create Todo with invalid body data',(done)=>{ //it() passing description and callback
    //Make POST /todos but send no body data - expect this to fail with 400
    request(app)
      .post('/todos')
      .send({}) //Send empty object
      .expect(400) //Expect our app to rspond with 400
      .end((err, res)=>{ //Callback receives error and result
        //Check database - no docs should exist (remember beforeEach runs before
        //each test clearing database down)
        if (err) {
          return done(err); //This is necessary to catch errors from earlier i.e. the expect(400)
        }
        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2); //No docs expected
          done();
        }).catch((e)=>{
          done(e);
        });
      });
  });
});

//GET /todos test block
describe('GET /todos', ()=> {
  it('should get all todos',(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{ //custom assertion -we define own function
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});
