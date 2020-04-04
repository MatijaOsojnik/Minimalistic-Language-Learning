const User = require("../models/User");

exports.registerUser = async (req, res) => {
    const {
        name,
        email,
        password,
        password2
    } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
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
            name,
            email,
            password,
            password2
        });
    } else {
        try {
            const user = new User(req.body)
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).render('register', {
                user,
                token
            })
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

exports.logoutUser = async (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
}

exports.loginUser = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({
                error: 'Login failed! Check authentication credentials'
            })
        }
        const token = await user.generateAuthToken()
        res.redirect('main')
        
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.getAllUsers = async (req, res) => {
    User.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
}

exports.getUser = async (req, res, next) => {
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