import fs from 'fs';
import path from 'path';

// word list adapted from glitch's friendly words list: https://github.com/glitchdotcom/friendly-words
// feel free to add your own custom search query suggestions here and submit a PR!

function getQuery() {
  const moduleURL = new URL(import.meta.url);
  const dirname = path.dirname(moduleURL.pathname);
  const glitchWords = fs
    .readFileSync(path.join(dirname, 'words/glitch-words.txt'), 'utf-8')
    .split('\n');
  const customQueries = fs
    .readFileSync(path.join(dirname, 'words/custom-queries.txt'), 'utf-8')
    .split('\n');
  const queries = [...glitchWords, ...customQueries];
  return queries[Math.floor(Math.random() * queries.length)];
}

export default getQuery;
