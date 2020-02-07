const express = require("express");
const handleError = require("errorHandler")
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
let nickname = ""


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../../") + "/public"));

app.set("views", path.join(__dirname, "../../views"));
app.engine("html", require("ejs").renderFile);

app.set("view engine", "html");

const userSchema = new Schema({
  nickName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
})

const Users = mongoose.model('Users', userSchema);

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log("Time: ", Date.now());
//   next();
// });
// define the home page route

router.route("/register")
  .get((req, res) => {
    res.render("register");
    })
    .post((req, res) => {

      bcrypt.hash(req.body.password, 10, (err, hash) => {

        const user = new Users({
          nickName: req.body.nickName,
          email: req.body.email,
          password: hash
        })
        user.save((err) => {
          if(err) {
            res.redirect("/register");
            return handleError(err);
          }else{
            res.render("login")
          }
        })
      })


    }); 

router.route("/login")
.get((req,res) => {
  res.render("login");
})
.post((req, res) => {  

  
  Users.findOne({email: req.body.email}, (err, foundUser) => {
    nickname = foundUser.nickName;
      if(err) return handleError(err);
      else{


          bcrypt.compare(req.body.password, foundUser.password).then(result => {
               if(result){
               res.render("main", {nickName: nickname})
              }
               else{
                console.log("Wrong password");
                 res.redirect("login")
               }
          }).catch((err) => console.log(err))         
      }
    });
  
  })

  router.get("/", (req, res) => {

    res.render("main", {nickName: nickname});
  });



module.exports = router;
