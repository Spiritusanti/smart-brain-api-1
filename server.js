const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./controllers/authorization')
const dotenv = require('dotenv');
dotenv.config();

const db = knex({
  client: 'pg',
  connection: {
    connectString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  }
});

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://granum-ego.herokuapp.com/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());


app.post('/signin', signin.SigninAuthentication(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db)})
app.post('/profile/:id', auth.requireAuth, (req, res) =>{ profile.handleProfileUpdate(req, res, db) })
app.put('/image', auth.requireAuth, (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', auth.requireAuth, (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})
// lol