require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const jsdom = require("jsdom");

const mongoose = require("mongoose");

const handleError = require("errorhandler");

const cors = require("cors"); 
const session = require("express-session");
const passport = require('passport');
const flash = require('connect-flash');

path = require("path");
$ = require("jquery")(new jsdom.JSDOM().window);

mongoose.promise = global.Promise;

const app = express();

require('./configs/passport')(passport);


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
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("MongoDB Connected")).catch(err => handleError(err));
mongoose.set('debug', true);

//expressjs - res.status is not a function TypeError - add next to the (err, req, res)
//https://github.com/visionmedia/supertest/issues/416#

app.use(
  session({
    secret: 'snEa?ky$22$4!1l_kaKSF5_-_saddGgggV214_513$$22seCrREafGBt10_-sda!!02',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// app.use((err, req, res, next) => {
//   res.status(err.status || 500);

//   res.json({
//     error: {
//       message: err.message,
//       error: {},
//     },
//   });
// });


// Routes - Moved to main
const learn = require(__dirname + "/routes/learn.js");
const practice = require(__dirname + "/routes/practice.js");
const about = require(__dirname + "/routes/about.js");
const main = require(__dirname + "/routes/main.js");

app.use('/practice', practice);
app.use('/learn', learn);
app.use('/about', about);
app.use('/user', main);


app.get('/', (req,res) => res.render('main', {user: req.user}))

//auth routes

const users = require(__dirname + "/routes/users.js");
app.use('/users', users)

//PORT

app.listen(3000, ()=>{
  console.log("Server started on port 3000")
})
