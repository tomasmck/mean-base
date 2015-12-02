var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates')
  , notifier = {
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      postmarkKey: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    };

module.exports = {
  development: {
    db: 'mongodb://localhost/reflex-dev',
    root: rootPath,
    notifier: notifier,
    app: {
        name: 'Reflex - Development Mode',
        rootURL: 'http://localhost:4000',
        passportSteamReturnURL: '/auth/steam/return'
    }
  },
  staging: {
    db: '',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Reflex - Staging Mode'
    }
  },
  production: {
    db: 'mongodb://reflexdbuser:Hyjyhu77!@ds055842.mongolab.com:55842/heroku_j4dsb64g',
    root: rootPath,
    notifier: notifier,
    app: {
        name: 'Reflex',
        rootURL: 'http://reflexgaming.herokuapp.com',
        passportSteamReturnURL: '/auth/steam/return'
    }
  }
};
