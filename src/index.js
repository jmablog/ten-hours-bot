const Twitter = require('twitter-lite');
require('dotenv').config();
const { google, gamesConfiguration_v1configuration } = require('googleapis');

const youtube = google.youtube({
  auth: process.env.GOOGLE_API_KEY,
  version: 'v3',
});

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_SECRET,
});

async function tweet() {
  try {
    const searchResults = await youtube.search.list({
      part: ['snippet'],
      q: 'dogs',
      maxResults: 50,
      relevanceLanguage: 'en',
      type: 'video',
      safeSearch: 'strict',
    });
    const results = searchResults.data?.items;
    const chosenResult = results[Math.floor(Math.random() * results.length)];
    const { title } = chosenResult.snippet || {};
    if (title == null) return;
    await client.post('statuses/update', { status: `${title} [10 hours]` });
  } catch (err) {
    console.log(err);
  }
}

tweet();
