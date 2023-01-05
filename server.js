const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const mailgun = require('mailgun-js');
const Vonage = require('@vonage/server-sdk')

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Create an in-memory list of alerts
const alerts = [];

app.get('/api/stock-price', async (req, res) => {
  try {
    const { symbol, targetPrice } = req.query;
    const response = await axios.get(
      `https://api.tradier.com/v1/markets/quotes?symbols=${symbol}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.TRADIER_ACCESS_TOKEN}`
        }
      }
    );
    const currentPrice = response.data.quotes.quote.last;
    if (currentPrice >= targetPrice) {
      // Send email and text message alert
      const mailgunClient = mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
      });
      const data = {
        from: process.env.MAILGUN_EMAIL_ADDRESS,
        to: process.env.MY_EMAIL_ADDRESS,
        subject: `${symbol} has reached the target price of ${targetPrice}`,
        text: `${symbol} has reached the target price of ${targetPrice}`
      };
      await mailgunClient.messages().send(data);

      const vonage = new Vonage({
        apiKey: process.env.VONAGE_API_KEY,
        apiSecret: process.env.VONAGE_API_SECRET
      });

    const from = process.env.VONAGE_PHONE_NUMBER
    const to = process.env.MY_PHONE_NUMBER
    const text = `${symbol} has reached the target price of ${targetPrice}`
      async function sendSMS() {
        await vonage.sms.send({to, from, text})
            .then(resp => { console.log('Message sent successfully'); console.log(resp); })
            .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
    }
    sendSMS();
      
    }
    // Add the alert to the list of alerts
      alerts.push({ symbol, targetPrice });
      res.send({ currentPrice });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
});

// Retrieve the list of alerts
app.get('/api/alerts', (req, res) => {
  res.send(alerts);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
