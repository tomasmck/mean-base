var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , crypto = require('crypto')
    , _ = require('underscore');

var UserSchema = new Schema({
    forename: String,
    surname: String,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    provider: String,
    hashed_password: String,
    salt: String
});


UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() { return this._password })

/**
 * Validations
 */

var validatePresenceOf = function (value) {
    return value && value.length
};

// the below 4 validations only apply if you are signing up traditionally

UserSchema.path('forename').validate(function (forename) {
    return forename.length
}, 'Foreame cannot be blank');

UserSchema.path('email').validate(function (email) {
    return email.length
}, 'Email cannot be blank');

UserSchema.path('hashed_password').validate(function (hashed_password) {
    return hashed_password.length
}, 'Password cannot be blank');


UserSchema.pre('save', function(next) {
    if (!this.isNew) return next()

    if (!validatePresenceOf(this.password))
        next(new Error('Invalid password'))
    else
        next()
});


UserSchema.methods = {

    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    },

    encryptPassword: function(password) {
        if (!password) return ''
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    }
};

UserSchema.statics.findByOpenID = function (openId, cb) {
    this.find({ openId: openId }, cb);
};

mongoose.model('User', UserSchema)