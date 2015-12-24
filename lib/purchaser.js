var config = require('../config');
var client = require('twilio')(config.accountSid, config.authToken);

var purchase = function (areaCode) {
  var number;

  client.availablePhoneNumbers('US').local.get({
        areaCode: areaCode,
        voiceEnabled: true,
        smsEnabled: true
  }).then(function(searchResults) {
    if (searchResults.availablePhoneNumbers.length === 0) {
      throw { message: 'No numbers found with that area code' };
    }

    return client.incomingPhoneNumbers.create({
      phoneNumber: searchResults.availablePhoneNumbers[0].phoneNumber,
      voiceUrl: config.applicationSid
    });
  }).then(function(number) {
    number = number;
  });

  return number;
}

export.purchase = purchase;
