# AirTNG App: Part 1 - Workflow Automation with Twilio with Node.js and Express

[![Build Status](https://travis-ci.org/TwilioDevEd/airtng-node.svg?branch=masked-numbers)](https://travis-ci.org/TwilioDevEd/airtng-node)

Protect your customers' privacy, and create a seamless interaction by provisioning Twilio numbers on the fly, and routing all voice calls, and messages through your very own 3rd party. This allows you to control the interaction between your customers, while putting your customer's privacy first.

## Configure Twilio to call your webhooks

You will need to configure Twilio to send requests to your application when SMS are received.

You will need to provision at least one Twilio number with sms capabilities so the application's users can make property reservations. You can buy a number [right here](https://www.twilio.com/user/account/phone-numbers/search). Once you have a number you need to configure your number to work with your application. Open [the number management page](https://www.twilio.com/user/account/phone-numbers/incoming) and open a number's configuration by clicking on it.

Remember that the number where you change the _SMS webhook_ must be the same one you set on the `TwilioPhoneNumber` setting.

![Configure Voice](http://howtodocs.s3.amazonaws.com/twilio-number-config-all-med.gif)

 To start using `ngrok` in our project you'll have execute to the following line in the _command prompt_:
```
ngrok http 3000
```

Bear in mind that our endpoint is:
```
http://<your-ngrok-subdomain>.ngrok.io/reservations/handle
```


## Create a TwiML App

This project is configured to use a _TwiML App_, which allows us to easily set the voice URLs for all Twilio phone numbers we purchase in this app.

Create a new TwiML app at https://www.twilio.com/user/account/apps/add and use its `Sid` as the `TwiMLApplicationSID` application setting.

![Creating a TwiML App](http://howtodocs.s3.amazonaws.com/call-tracking-twiml-app.gif)

Once you have created your TwiML app, configure your Twilio phone number to use it ([instructions here](https://www.twilio.com/help/faq/twilio-client/how-do-i-create-a-twiml-app)).

If you don't have a Twilio phone number yet, you can purchase a new number in your [Twilio Account Dashboard](https://www.twilio.com/user/account/phone-numbers/incoming).

You'll need to update your TwiML app's voice and SMS URL setting to use your `ngrok` hostname, so it will look something like this:
```
http://<your-ngrok-subdomain>.ngrok.io/commuter/use-sms
http://<your-ngrok-subdomain>.ngrok.io/commuter/use-voice
```


## Local Development

1. This sample application stores data in a [MongoDB](https://www.mongodb.org/) database using [Mongoose](http://mongoosejs.com/). You can download and run MongoDB yourself (OS X, Linux, Windows).

   On OS X, maybe the easiest way to get MongoDB running locally is to install via [Homebrew](http://brew.sh/).

   ```
   $ brew install mongodb
   ```
   You should then be able to run a local server with:

   ```
   $ mongod
   ```

2. Clone this repository and `cd` into its directory:
   ```
   $ git clone git@github.com:TwilioDevEd/airtng-node.git
   $ cd airtng-node
   ```

3. Install dependencies:
   ```
   $ npm install
   ```

4. Edit the sample configuration file `.env` to match your configuration.

   Once you have edited the `.env` file, if you are using a UNIX operating system, just use the source command to load the variables into your environment:

  ```
  $ source .env
  ```

5. Run the application.

  ```
  $ npm start
  ```

6. Check it out at [http://localhost:3000](http://localhost:3000)

That's it!

## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.
