
var mongoose = require('mongoose')
  , SteamStrategy = require('passport-steam').Strategy
  , User = mongoose.model('User');

module.exports = function (passport, config) {
  // require('./initializer')

    // serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user.displayName)
    });

    passport.deserializeUser(function(displayName, done) {
        User.findOne({ 'displayName': displayName }, function (err, user) {
            done(err, user)
        })
    });

  passport.use(new SteamStrategy({
        returnURL: config.app.rootURL + config.app.passportSteamReturnURL,
        realm: config.app.rootURL,
        apiKey: '901CD13A7078AF1D41E9763CB3D5E384'
      },
      function(identifier, profile, done) {
          //profile.identifier = identifier;
          User.findOne({ 'steamProfile.steamid': profile._json.steamid }, function(err, user) {
              if (err) {
                  console.log("Error finding user: " + err);
                  return done(err);
              }
              //No user was found... so create a new user with values from Steam (all the profile stuff)
              if (!user) {
                  console.log("No user found, creating new user:");
                  user = new User({
                      displayName: profile.displayName,
                      provider: 'steam',
                      steamProfile: profile._json
                  });
                  user.save(function(err) {
                      if (err) console.log(err);
                      return done(err, user);
                  });
              } else {
                  //found user. Return
                  return done(err, user);
              }
          });
      }
  ));
};
