import Twitter from 'twitter-lite';
import * as dotenv from 'dotenv';
import { google, gamesConfiguration_v1configuration } from 'googleapis';
import htmlEntities from 'html-entities';

import getQuery from './searchQueries.js';
const { decode } = htmlEntities;
dotenv.config();

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
    // pick a random search query
    const q = getQuery();
    const searchResults = await youtube.search.list({
      part: ['snippet'],
      q,
      maxResults: 50,
      relevanceLanguage: 'en',
      type: 'video',
      safeSearch: 'strict',
    });
    const results = searchResults.data?.items;
    const chosenResult = results[Math.floor(Math.random() * results.length)];

    const { title } = chosenResult.snippet || {};
    if (title == null) return;

    const formattedTitle =
      Math.floor(Math.random() * Math.floor(10)) % 2 === 0
        ? `${decode(title)} [10 hours]`
        : `10 hours of ${decode(title)}`;
    await client.post('statuses/update', { status: formattedTitle });
  } catch (err) {
    console.log(err);
  }
}

tweet();
