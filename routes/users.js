var express = require('express');
var router = express.Router();
var userController = require('../app/controllers/users');
var async = require('async');

module.exports = function (app, passport, auth) {

    app.get('/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
        });

    app.get('/auth/steam',
        passport.authenticate('steam'),
        function(req, res) {
            // The request will be redirected to Steam for authentication, so
            // this function will not be called.
        });

    app.get('/auth/steam/return',
        passport.authenticate('steam',
            {
                successRedirect: '/#!/games',
                failureRedirect: '/'
            }));

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

};
