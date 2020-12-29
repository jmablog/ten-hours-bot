const Twitter = require('twitter-lite');
require('dotenv').config();

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_SECRET,
});

async function tweet() {
  try {
    await client.post('statuses/update', { status: 'Hello world!' });
  } catch (err) {
    console.log(err);
  }
}

tweet();
