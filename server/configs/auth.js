module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/learn")
  }
};

// const express = require("express");
// const handleError = require("errorHandler")
// const router = express.Router();
// const bodyParser = require('body-parser');
// const bcrypt = require("bcrypt");
// const userSchema = require("../models/User");

// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, "../../") + "/public"));

// app.set("views", path.join(__dirname, "../../views"));
// app.engine("html", require("ejs").renderFile);

// app.set("view engine", "html");


// router.route("/register")
//   .get((req, res) => {
//     res.locals.userValue = req.userValue
//     res.render("register");
//     })
//     .post((req, res) => {

//       bcrypt.hash(req.body.password, 10, (err, hash) => {

//         const user = new userSchema({
//           nickName: req.body.nickName,
//           email: req.body.email,
//           password: hash
//         })
//         user.save().then(response => {
//           res.render("register", {userValue: user})
//           res.response(201).json({
//             message: "User successfully created",
//             result: response
//           })
//         }).catch(error => {
//           res.redirect("/register", 500)
//           res.status(500).json({
//             error: error
//           })
//         })
//       })
//     }); 

// router.route("/login")
// .get((req,res) => {
//   res.render("login");
// })
// .post((req, res) => {  
//     let getUser;
//     let message;
//   userSchema.findOne({email: req.body.email}, (err, foundUser) => {
//       if(err) return handleError(err);
//       else{
//           getUser = foundUser;
//           message = "Wrong email/password."
//           bcrypt.compare(req.body.password, foundUser.password).then(result => {
//                if(result){
//                res.redirect("main")
//               }
//                else{
//                  res.render("login", {message: message})
//                }
//           }).catch((err) => console.log(err))         
//       }
//     });
  
//   })

//   module.exports = router;

