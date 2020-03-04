/*const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const { ensureAuthenticated, forwardAuthenticated } = require('../configs/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../../") + "/public"));

app.set("views", path.join(__dirname, "../../views"));
app.engine("html", require("ejs").renderFile);

app.set("view engine", "html");
// Dashboard
router.get('/users/:id', ensureAuthenticated, (req, res, next) => {
  console.log(req.params.id)
  res.render('main', {user: req.user})
}
);

module.exports = router;*/

 const express = require("express");
 const router = express.Router();
 const bodyParser = require("body-parser");
 const { ensureAuthenticated, forwardAuthenticated } = require('../configs/auth');

 const app = express();

 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(express.static(path.join(__dirname, "../../") + "/public"));

 app.set("views", path.join(__dirname, "../../views"));
 app.engine("html", require("ejs").renderFile);

 app.set("view engine", "html");

 router.get('/:id', ensureAuthenticated, (req, res, next) => {
  console.log(req.params.id)
  res.render('user', {user: req.user})
});



 module.exports = router;
