
const express = require('express');
const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser!
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  // connect to your own database here:
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'nikhila',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.use(cors())
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!

app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})





/*const express = require('express');
const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser!
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
//const knex = require('knex')

const app=express();

app.use(bodyParser.json());
app.use(cors())

const database={
  users:[
  {
    id:'123',
    name: 'John',
    email: 'j@gmail.com',
    password: 'hello',
    entries:0,
    joined: new Date()
  },
  {
    id:'124',
    name: 'sally',
    email: 's@gmail.com',
    password: 'monday',
    entries:0,
    joined: new Date()
  }
  ]
}

app.get('/',(req,res)=>{
  res.send(database.users);
})

app.post('/signin',(req,res)=>{
  if(req.body.email===database.users[0].email && req.body.password == database.users[0].password){
    res.json('success');

} else {
  res.status(400).json('error logging in');
}

})

app.post('/register',(req,res)=>{
  const {email,name,password} = req.body;
  bcrypt.hash("bacon", null, null, function(err, hash) {
    console.log(hash);
});
  database.users.push({
    id:'125',
    name: name,
    email: email,
    password: password,
    entries:0,
    joined: new Date()
  })
  res.json(database.users[database.users.length-1]);
  })

app.post('/profile/:id',(req,res)=>{
  const { id }=req.params;
  let found=false;
  database.users.forEach(user=>{
    if(user.id===id){
      found=true;
      user.entries++
      return res.json(user);
    }
  })
  if(!found){
    res.status(400).json('not found');
  }
})



app.put('/image',(req,res)=>{
  const { id }=req.body;
  let found=false;
  database.users.forEach(user=>{
    if(user.id===id){
      found=true;
      user.entries++
      return res.json(user.entries);
    }
  })
  if(!found){
    res.status(400).json('not found');
  }
})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})*/