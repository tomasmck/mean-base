var express = require('express');
var router = express.Router();
var userController = require('../app/controllers/users');
var async = require('async');

module.exports = function (app, passport, auth) {

    app.post('/api/users/session', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    }));

    app.get('/auth/steam',
        passport.authenticate('steam'),
        function(req, res) {
            // The request will be redirected to Steam for authentication, so
            // this function will not be called.
        });

    app.get('/auth/steam/return',
        passport.authenticate('steam', { failureRedirect: '/login' }),
        userController.session);

};
