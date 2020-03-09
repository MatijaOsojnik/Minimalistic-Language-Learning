const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport")

exports.registerUser = (req, res) => {
    const {
        nickName,
        email,
        password,
        password2
    } = req.body;
    let errors = [];

    if (!nickName || !email || !password || !password2) {
        errors.push({
            msg: 'Please enter all fields'
        });
    }

    if (password != password2) {
        errors.push({
            msg: 'Passwords do not match'
        });
    }

    if (password.length < 8) {
        errors.push({
            msg: 'Password must be at least 8 characters'
        });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            nickName,
            email,
            password,
            password2
        });
    } else {
        User.findOne({
            email: email
        }).then(user => {
            if (user) {
                errors.push({
                    msg: 'Email already exists'
                });
                res.render('register', {
                    errors,
                    nickName,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    nickName,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
}

exports.logoutUser = (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
}

exports.loginUser = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/learn',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
}

exports.getAllUsers = (req, res) => {
    User.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
}

exports.getUser = (req, res, next) => {
    User.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                ...data
            })
        }
    })
}


exports.updateUser = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    })
}