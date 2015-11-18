var mongoose = require('mongoose')
    , path = require('path')
    , User = mongoose.model('User');

var http = require('http')
    , req = http.IncomingMessage.prototype;

exports.createUser = function (req, res) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            return res.render('/', { errors: err.errors, user: user })
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err)
            } else {
                return res.send(200, { user: req.user ? req.user : {} });
            }
        })
    })
};


/*
*
* Need Passport JS
*
* */