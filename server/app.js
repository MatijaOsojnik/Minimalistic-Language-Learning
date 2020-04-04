require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require("mongoose");

const handleError = require("errorhandler");

const cors = require("cors");

path = require("path");

mongoose.promise = global.Promise;

const app = express();

app.use(cors());
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../") + "/public"));
app.set("views", path.join(__dirname, "../views"));

app.engine("html", require("ejs").renderFile);

app.set("view engine", "ejs");

//configure Mongoose
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected")).catch(err => handleError(err));
mongoose.set('debug', true);

//expressjs - res.status is not a function TypeError - add next to the (err, req, res)
//https://github.com/visionmedia/supertest/issues/416#
let errors = [];


// Routes - Moved to main
const learn = require("./routes/learn.js");
const practice = require("./routes/practice.js");
const about = require("./routes/about.js");
const main = require("./routes/main.js");

app.use('/practice', practice);
app.use('/learn', learn);
app.use('/about', about);

app.get('/', (req, res) => res.render('main'))

app.post('/', (req, res) => {
  console.log(req.body.email)
})

//auth routes
app.use(express.json())
const userRouter = require("./routes/users.js");
app.use('/users', userRouter)

//PORT

app.listen(3000, () => {
  console.log("Server started on port 3000")
})