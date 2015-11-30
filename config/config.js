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
      name: 'Reflex - Development Mode'
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
    db: 'mongodb://r',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Reflex'
    }
  }
};
