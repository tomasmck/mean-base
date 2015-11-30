
var mongoose = require('mongoose')
  , SteamStrategy = require('passport-steam').Strategy
  , User = mongoose.model('User');


module.exports = function (passport, config) {
  // require('./initializer')

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

  passport.use(new SteamStrategy({
        returnURL: 'http://localhost:4000/auth/steam/return',
        realm: 'http://localhost:4000/',
        apiKey: '901CD13A7078AF1D41E9763CB3D5E384'
      },
      function(identifier, profile, done) {
        /*User.findByOpenID(profile.id, function (err, user) {
          return done(err, user);
        });*/
        profile.identifier = identifier;
        return done(null, profile);
      }
  ));
};
