const Channel = require('../lib/websocket/channel');
const { TweetChannel } = require('./tweets');

module.exports = {
  channels: [
    TweetChannel
  ],
}