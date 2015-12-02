var mongoose = require('mongoose')
    , path = require('path')
    , User = mongoose.model('User');

var http = require('http')
    , req = http.IncomingMessage.prototype;