
var mongoose = require('mongoose')
  , LocalStrategy = require('passport-local').Strategy
  , SteamStrategy = require('passport-steam').Strategy
  , User = mongoose.model('User');


module.exports = function (passport, config) {
  // require('./initializer')

  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  });

  passport.use(new SteamStrategy({
        returnURL: 'http://localhost:4000/auth/steam/return',
        realm: 'http://localhost:4000/',
        apiKey: '901CD13A7078AF1D41E9763CB3D5E384'
      },
      function(identifier, profile, done) {
        /*User.findByOpenID({ openId: identifier }, function (err, user) {
          return done(err, user);
        });*/
        profile.identifier = identifier;
        return done(null, profile);
      }
  ));

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err) }
        if (!user) {
          return done(null, false, { message: 'Unknown user' })
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'Invalid password' })
        }
        return done(null, user)
      })
    }
  ))
};
