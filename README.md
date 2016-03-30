# AirTNG App: Part 1 - Workflow Automation with Twilio with Node.js and Express

[![Build Status](https://travis-ci.org/TwilioDevEd/airtng-node.svg?branch=master)](https://travis-ci.org/TwilioDevEd/airtng-node)

Learn how to automate your workflow using Twilio's REST API and Twilio SMS. This example app is a vacation rental site, where the host can confirm a reservation via SMS.

[Read the full tutorial here](https://www.twilio.com/docs/tutorials/walkthrough/workflow-automation/node/express)!

## Local Development

1. You will need to configure Twilio to send requests to your application when SMS are received.

   You will need to provision at least one Twilio number with sms capabilities so the application's users can make property reservations. You can buy a number [right here](https://www.twilio.com/user/account/phone-numbers/search). Once you have a number you need to configure your number to work with your application. Open [the number management page](https://www.twilio.com/user/account/phone-numbers/incoming) and open a number's configuration by clicking on it.

   Remember that the number where you change the _SMS webhook_ must be the same one you set on the `TwilioPhoneNumber` setting.

   ![Configure Voice](http://howtodocs.s3.amazonaws.com/twilio-number-config-all-med.gif)

   To start using `ngrok` in our project you'll have execute to the following line in the _terminal_.

   ```
   $ ngrok http 3000
   ```

   Keep in mind that our endpoint is:

   ```
   http://<your-ngrok-subdomain>.ngrok.io/reservations/handle
   ```

2. This sample application stores data in a [MongoDB](https://www.mongodb.org/) database using [Mongoose](http://mongoosejs.com/). You can download and run MongoDB yourself (OS X, Linux, Windows).

   On OS X, maybe the easiest way to get MongoDB running locally is to install via [Homebrew](http://brew.sh/).

   ```
   $ brew install mongodb
   ```
   You should then be able to run a local server with:

   ```
   $ mongod
   ```

3. Clone this repository and `cd` into it.

   ```
   $ git clone git@github.com:TwilioDevEd/airtng-node.git
   $ cd airtng-node
   ```

4. Install the dependencies.

   ```
   $ npm install
   ```

5. Edit the sample configuration file `.env` to match your configuration.

   Once you have edited the `.env` file, if you are using a UNIX operating system, just use the source command to load the variables into your environment:

  ```
  $ source .env
  ```

6. Run the application.

  ```
  $ npm start
  ```

7. Check it out at [http://localhost:3000](http://localhost:3000)

That's it!

To let our Twilio Phone number use the callback endpoint we exposed, our development server will need to be publicly accessible. [We recommend using ngrok to solve this problem](https://www.twilio.com/blog/2015/09/6-awesome-reasons-to-use-ngrok-when-testing-webhooks.html).

## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.
