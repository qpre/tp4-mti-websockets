const { Channel } = require('../lib/websocket/channel');
const TweetModel = require('../models/tweet'); 

const TweetChannel = new Channel('entities:tweets');

TweetChannel.on('join', (client) => TweetChannel.send(client, 'joined'));

TweetChannel.on('add', (client, data) => {
  const tweet = TweetModel.add(data);
  TweetChannel.broadcast('add', tweet);
});

TweetChannel.on('index', (client) => {
  const tweets = TweetModel.all();
  TweetChannel.send(client, 'index', { tweets });
});

module.exports = { TweetChannel };