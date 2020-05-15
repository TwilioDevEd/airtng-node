<a href="https://www.twilio.com">
  <img src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg" alt="Twilio" width="250" />
</a>

# AirTNG App: Part 1 - Workflow Automation with Twilio with Node.js and Express
> We are currently in the process of updating this sample template. If you are encountering any issues with the sample, please open an issue at [github.com/twilio-labs/code-exchange/issues](https://github.com/twilio-labs/code-exchange/issues) and we'll try to help you.

![](https://github.com/TwilioDevEd/airtng-node/workflows/Node.js/badge.svg)

## About

Learn how to automate your workflow using Twilio's REST API and Twilio SMS. This example app is a vacation rental site, where the host can confirm a reservation via SMS.

[Read the full tutorial here](https://www.twilio.com/docs/tutorials/walkthrough/workflow-automation/node/express)!

Implementations in other languages:

| .NET | Java | Python | PHP | Ruby |
| :--- | :--- | :----- | :-- | :--- |
| [Done](https://github.com/TwilioDevEd/airtng-csharp) | [Done](https://github.com/TwilioDevEd/airtng-servlets)  | [Done](https://github.com/TwilioDevEd/airtng-flask)  | [Done](https://github.com/TwilioDevEd/airtng-laravel) | [Done](TBD)  |

## Set up

### Requirements

- [Nodejs](https://nodejs.org/) v10 or v12
- [Mongo](https://docs.mongodb.com/manual/installation/)

### Twilio Account Settings

This application should give you a ready-made starting point for writing your own application.
Before we begin, we need to collect all the config values we need to run the application:

| Config Value | Description |
| :----------  | :---------- |
| TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN | You could find them in your [Twilio Account Settings](https://www.twilio.com/console/account/settings)|
| TWILIO_NUMBER | You can get one [here](https://www.twilio.com/console/phone-numbers/incoming) |

### Local Development

1. Clone this repository and `cd` into it.

   ```bash
   git clone git@github.com:TwilioDevEd/airtng-node.git
   cd airtng-node
   ```

1. Install the dependencies.

   ```bash
   npm install
   ```

1. Copy the sample configuration `.env.example` to `.env`, and then edit `.env` to match your configuration.

   ```bash
   cp .env.example .env
   ```

   See [Twilio Account Settings](#twilio-account-settings) to locate the necessary environment variables. The phone numbers should be in [E.164 format](https://www.twilio.com/help/faq/phone-numbers/how-do-i-format-phone-numbers-to-work-internationally).

1. Run the application (will run on port 3000).

   ```bash
   npm start
   ```

1. Check it out at [http://localhost:3000](http://localhost:3000)

1. To let our Twilio Phone number use the callback endpoint we exposed, our development server will need to be publicly accessible. You could expose the application to the wider Internet using [ngrok](https://ngrok.com/). [Here](https://www.twilio.com/blog/2015/09/6-awesome-reasons-to-use-ngrok-when-testing-webhooks.html) there is an interesting article about why we recommend you to use ngrok.

   ```bash
   ngrok http 3000
   ```

   Keep in mind that our endpoint is:

   ```
   http://<your-ngrok-subdomain>.ngrok.io/reservations/handle
   ```

1. You will need to configure Twilio to send requests to your application when SMS are received. You will need to provision at least one Twilio number with sms capabilities so the application's users can make property reservations. On [Twilio Account Settings](#twilio-account-settings) you could find the link to buy a Twilio number. Once you have a number you need to configure your number to work with your application. Open the number management page and open a number's configuration by clicking on it. Remember that the number where you change the SMS webhook must be the same one you set on the TwilioPhoneNumber setting.

   ![Configure Messaging](webhook.png)

That's it!

## Tests

You can run the tests locally by typing

```bash
npm test
```

### Cloud deployment

Additionally to trying out this application locally, you can deploy it to a variety of host services. Here is a small selection of them.

Please be aware that some of these might charge you for the usage or might make the source code for this application visible to the public. When in doubt research the respective hosting service first.

| Service                           |                                                                                                                                                                                                                           |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Heroku](https://www.heroku.com/) | [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)                                                                                                                                       |

## Resources

- The CodeExchange repository can be found [here](https://github.com/twilio-labs/code-exchange/).

## Contributing

This template is open source and welcomes contributions. All contributions are subject to our [Code of Conduct](https://github.com/twilio-labs/.github/blob/master/CODE_OF_CONDUCT.md).

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

No warranty expressed or implied. Software is as is.

[twilio]: https://www.twilio.com
