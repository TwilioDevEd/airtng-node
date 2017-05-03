<a href="https://www.twilio.com">
  <img src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg" alt="Twilio" width="250" />
</a>

# Airtng App: Part 2 - Masked Numbers With Twilio - Node.js/Express

[![Build Status](https://travis-ci.org/TwilioDevEd/airtng-node.svg?branch=masked-numbers)](https://travis-ci.org/TwilioDevEd/airtng-node)

Protect your customers' privacy by creating a seamless interaction by provisioning Twilio numbers on the fly. Route all voice calls and messages through your very own 3rd party. This allows you to control the interaction between your customers while putting your customer's privacy first.

[Read the full tutorial here](https://www.twilio.com/docs/tutorials/walkthrough/masked-numbers/node/express)!

## Local Development

1. You will need to configure Twilio to send requests to your application when SMSs are received.

  You will need to provision at least one Twilio number with SMS capabilities so the application's users can make property reservations. You can buy a number on the [phone numbers search page](https://www.twilio.com/user/account/phone-numbers/search). Once you have a number you need to configure it to work with your application. Open [the number management page](https://www.twilio.com/user/account/phone-numbers/incoming) and open a number's configuration by clicking on it.

  Remember that the number where you change the _SMS webhook_ must be the same one you set on the `TwilioPhoneNumber` settings.

  ![Configure Voice](http://howtodocs.s3.amazonaws.com/twilio-number-config-all-med.gif)

   To start using `ngrok` in our project you'll have execute to the following line in the _command prompt_.

  ```bash
  ngrok http 3000
  ```

  Keep in mind that our endpoint is:

  ```bash
  http://<your-ngrok-subdomain>.ngrok.io/reservations/handle
  ```

1.  This project is configured to use a _TwiML App_, which allows us to easily set the  voice URLs for all Twilio phone numbers we purchase in this app.

  Create a new TwiML app at https://www.twilio.com/console/phone-numbers/dev-tools/twiml-apps/add and use its `Sid` as the `TWIML_APPLICATION_SID` application setting.

  ![Creating a TwiML App](http://howtodocs.s3.amazonaws.com/call-tracking-twiml-app.gif)

  Once you have created your TwiML app configure your Twilio phone number to use it ([instructions here](https://www.twilio.com/help/faq/twilio-client/how-do-i-create-a-twiml-app)).

  If you don't have a Twilio phone number yet, you can purchase a new number in your [Twilio Account Dashboard](https://www.twilio.com/user/account/phone-numbers/incoming).

  You'll need to update your TwiML app's voice and SMS URL setting to use your `ngrok` hostname. It will look something like this:

  ```
  http://<your-ngrok-subdomain>.ngrok.io/commuter/use-sms
  http://<your-ngrok-subdomain>.ngrok.io/commuter/use-voice
  ```

1. This sample application stores data in a [MongoDB](https://www.mongodb.org/) database using [Mongoose](http://mongoosejs.com/). You can download and run MongoDB yourself (OS X, Linux, Windows).

   On OS X, maybe the easiest way to get MongoDB running locally is to install via [Homebrew](http://brew.sh/).

   ```bash
   $ brew install mongodb
   ```
   You should then be able to run a local server with:

   ```bash
   $ mongod
   ```

1. Clone this repository and `cd` into it.

   ```bash
   $ git clone git@github.com:TwilioDevEd/airtng-node.git
   $ cd airtng-node
   ```

1. Copy the sample configuration file and edit it to match your configuration.

   ```bash
   $ cp .env.example .env
   ```

  You can find your `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` in your
  [Twilio Account Settings](https://www.twilio.com/user/account/settings).

  You will also need a `TWILIO_NUMBER`, which you may find [here](https://www.twilio.com/user/account/phone-numbers/incoming).

  Use the TwiML app `Sid` obtained in step **2** in the `TWIML_APPLICATION_SID` variable.  

1. Install dependencies:

   ```bash
   $ npm install
   ```

1. Make sure the tests succeed.

  ```bash
  $ npm test
  ```

1. Run the application.

  ```bash
  $ npm start
  ```

1. Check it out at [http://localhost:3000](http://localhost:3000)

That's it!

## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.
