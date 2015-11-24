var express = require('express');
var router = express.Router();
var async = require('async');

module.exports = function (app, passport, auth) {

  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

};