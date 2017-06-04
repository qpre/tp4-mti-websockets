const Server = require('./lib/websocket/server');
const { channels } = require('./channels/index.js');

const { Router } = Server.start();

channels.forEach(channel => Router.addChannel(channel));