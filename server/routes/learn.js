const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, "../../") + "/public"));

app.set("views", path.join(__dirname, "../../views"));
app.engine("html", require("ejs").renderFile);

app.set("view engine", "html");

router.route("/")
  .get((req, res) => {
    res.render("learn/learn", {
      user: req.user,
    })
  });

router.route("/cinema")
  .get((req, res) => {
    res.render("learn/cinema")
  })

router.route("/cinema/1")
  .get((req, res) => {
    res.render("learn/cinema/1")
  })

router.route("/coffee")
  .get((req, res) => {
    res.render("learn/coffee")
  })

router.route("/directions")
  .get((req, res) => {
    res.render("learn/directions")
  })
router.route("/greetings")
  .get((req, res) => {
    res.render("learn/greetings")
  })



module.exports = router;