const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// Connect to postgres database
const db = knex ({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'BruceChan0706',
    database : 'face-recognition'
  }
});

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("success");
});

// Signin endpoint
app.post("/signin", (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

// Register endpoint 
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt, saltRounds) }); // dependency injection

// Profile endpoint
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) });

// Image endpoint
app.put("/image", (req, res) => { image.handleImage(req, res, db) });

// imageurl endpoint
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});

/*
  routing
  / ==> res = this is working
  /signin ==> post = success/fail
  /register ==> post = user
  /profile/:id ==> get = user
  /image ==> put = user
*/