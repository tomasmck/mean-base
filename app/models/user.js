var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , crypto = require('crypto')
    , _ = require('underscore');

//mongoose.set('debug', true);

var UserSchema = new Schema({
    displayName: String,
    provider: String,
    steamProfile: Object,
    balance: Number
});

mongoose.model('User', UserSchema);