const Twitter = require('twitter');
const colors = require('colors');

let client = new Twitter({
  consumer_key: '38LT8SpZlEikJOUIP3sVc8Iid',
  consumer_secret: 'BPPDzznievdSjWiqgSAnQUAr4QgZ7D4kD3GJl6Oz22qW1IH3Ct',
  access_token_key: '804531512288903168-us1C0wMaGI2sVvHrCEzaF26b6v21WcU',
  access_token_secret: 'rJt0QLhTd3RNdIYOLPdOXrDeUtsK9I22OtStDsyAOFwR5'
});

let stream = client.stream('statuses/filter', { track: 'bitcoin' });

let queue = [];

stream.on('data', function (event) {
  let text = event.text || ''
  text = text.replace(/\r?\n|\r/g, "");

  text = text.toLowerCase();
  text = text.replace('bitcoin', 'bitcoin'.bgYellow);
  text = text.replace('bitpay', 'bitpay'.bgBlue);
  text = text.replace('bitcoincash', 'bitcoincash'.bgGreen);
  text = text.replace('bitcoin cash', 'bitcoin cash'.bgGreen);

  let tokens = text.split(' ');
  queue = queue.concat(tokens);
});

stream.on('error', function (error) {
  throw error;
});

let writer;

createWriter(writer, 200);

function createWriter(writer, timer) {
  writer = setInterval(() => {
    if (queue.length > 0) {
      process.stdout.write(queue.shift() + ' ');
    }

    if (queue.length > 3000) {
      queue = queue.slice(0, 59);
    }

  }, timer);
}