const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../../") + "/public"));

app.set("views", path.join(__dirname, "../../views"));
app.engine("html", require("ejs").renderFile);

app.set("view engine", "html");

// Gather modules

const phrase = require(path.join(__dirname, "../../") + "/Modules/functions/phrase.js");
const random = require(path.join(__dirname, "../../") + "/Modules/functions/random.js");
const data = require(path.join(__dirname, "../../") + "/Modules/data/DATA.js");

// Set count to 0
let countRight = 0;
let countTotal = 0;

router.route("/")
  .get((req, res) => {
    console.log(req.user);
    const newNumber = random(data);
    germanPhrase = phrase.german(newNumber, data);
    englishPhrase = phrase.english(newNumber, data);
    res.render("practice", {
      germanPhrase: germanPhrase,
      englishPhrase: englishPhrase,
      count: countRight,
        user: req.user,
    });
  })
  .post((req, res) => {
    const englishInput = req.body.englishText;
    if (countRight < 1) {
      if (!!englishInput === true) {
        countTotal++;
        if (englishInput === englishPhrase) {
          countRight++;
          console.log(englishInput, englishPhrase);
        }
      }
      res.redirect("/practice");
      console.log("Total: " + countTotal);
    } else {
      setTimeout(e => {
        res.render("success");
        countRight = 0;
      }, 0);
    }
  });

  module.exports = router;