import fs from 'fs';
import path from 'path';

function getQuery() {
  const moduleURL = new URL(import.meta.url);
  const dirname = path.dirname(moduleURL.pathname);
  const words = fs
    .readFileSync(path.join(dirname, 'words/words.txt'), 'utf-8')
    .split('\n');

  return words[Math.floor(Math.random() * words.length)];
}

export default getQuery;
