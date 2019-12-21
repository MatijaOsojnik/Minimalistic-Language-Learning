require('dotenv').config();

const sass = require("node-sass");
const express = require('express');
const bodyParser = require('body-parser');
const jsdom = require("jsdom");
const mongoose = require("mongoose");
path = require("path")
$ = require("jquery")(new jsdom.JSDOM().window);

console.log(sass.info);

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../") + "/public"));

app.set("views", path.join(__dirname, "../views"));
app.engine("html", require("ejs").renderFile);

app.set("view engine", "ejs");

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

const learn = require(__dirname + "/routes/learn.js");
const practice = require(__dirname + "/routes/practice.js");
const about = require(__dirname + "/routes/about.js");
const main = require(__dirname + "/routes/main.js");

app.use('/practice', practice);
app.use('/learn', learn);
app.use('/about', about);
app.use('/', main);

app.route("/login")
.get((req,res) => {
  res.render("login");
})
.post((req, res) => {
  const name = req.body.email;
  const surname = req.body.password;
  console.log(name, surname)
  res.redirect("/login")
  })

app.route("/register")
  .get((req, res) => {
    res.render("register");
    })
    .post((req, res) => {
      const name = req.body.email;
      const surname = req.body.password;
      console.log(name, surname);
      res.redirect("/login");
    });

app.listen(3000, ()=>{
  console.log("Server started on port 3000")
})
