const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../../") + "/public"));

app.set("views", path.join(__dirname, "../../views"));
app.engine("html", require("ejs").renderFile);

app.set("view engine", "html");

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log("Time: ", Date.now());
//   next();
// });
// define the home page route
router.get("/", (req, res) => {
  res.render("main");
});

module.exports = router;
