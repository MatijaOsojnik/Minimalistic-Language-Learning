require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const jsdom = require("jsdom");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cors = require("cors"); 
const session = require("express-session");
const handleError = require("errorhandler");
const router = require("express-promise-router")

const passport = require("passport")

const assert = require("assert")

path = require("path");
$ = require("jquery")(new jsdom.JSDOM().window);

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

const app = express();



app.use(cors());
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../") + "/public"));
app.set("views", path.join(__dirname, "../views"));
app.use(session({secret: 'language-learning-site', cookie: {maxAge: 60000}, resave: false, saveUninitialized: false }));

app.engine("html", require("ejs").renderFile);

app.set("view engine", "ejs");
//configure Mongoose

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).catch(error => handleError(error));
mongoose.set('debug', true);


// const admin = new Users({
//   nickName: 'Admin',
//   email: 'matijaosojnik@protonmail.com',
//   password: 'root'
// });

// admin.save((err) => {
//   if(err) return handleError(err);
// });



//expressjs - res.status is not a function TypeError - add next to the (err, req, res)
//https://github.com/visionmedia/supertest/issues/416#

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.json({
    error: {
      message: err.message,
      error: {},
    },
  });
});

const learn = require(__dirname + "/routes/learn.js");
const practice = require(__dirname + "/routes/practice.js");
const about = require(__dirname + "/routes/about.js");
const main = require(__dirname + "/routes/main.js");

app.use('/practice', practice);
app.use('/learn', learn);
app.use('/about', about);
app.use('/', main);

app.listen(3000, ()=>{
  console.log("Server started on port 3000")
})
