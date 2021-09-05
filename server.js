const express=require('express');
const bodyParser = require('body-parser');
const path=require('path');
const mongoose = require('mongoose');
const mongodb = require ('mongodb');
const multer=require('multer');
const passport = require('passport');


const passportSetup = require('./config/passport-setup');
const keys = require('./keys/keys');
const adminRoutes = require ('./routes/admin');
const reservationRoutes = require ('./routes/reservation');
const authRoutes = require ('./routes/auth');
const ownerRoutes = require ('./routes/owner');

const Hotel = require ('./models/Hotel');
const Order = require ('./models/Order');
const Note = require ('./models/Notes');


const dates = require('./assests/dates');
const Room = require('./models/Room');
const Features = require('./models/Features');
const { features } = require('process');
const { notEqual } = require('assert');
const Notes = require('./models/Notes');
const User = require('./models/User');

const app = express();

app.use(passport.initialize());

app.use('/images', express.static('images')); 

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {

 //   cb(null, new Date().toISOString() + '-' + file.originalname);
 cb(null,Date.now() +  file.originalname); 

  }
});

const fileFilter = (req, file, cb) => {


  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json());

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).array('imgs',10)
);
app.use('/images', express.static(path.join(__dirname,'../images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});




app.use('/auth',authRoutes);
app.use('/admin',adminRoutes);
app.use('/reservation',reservationRoutes);
app.use('/owner',ownerRoutes);


app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error;
 // const data = error.data;
  res.status(status).json({ message: message});
});




mongoose
  .connect( keys.mongodb.dbURI )
  .then(result => {
    const server = app.listen(8080);

    })
  
.catch (err => {
  console.log(err);
})