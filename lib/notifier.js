var config = require('../config');
var client = require('twilio')(config.accountSid, config.authToken);

client.sendMessage({
  to:   '+593992670240',
  from: config.phoneNumber,
  body: 'Haskell rocks'
}, function(err) {
  if (!err) {

  }
});
