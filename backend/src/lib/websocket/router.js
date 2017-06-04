const WebSocket = require('ws');

let channels = [];
let server = null;

const fail = (ws, message) => ws.send(message);

const route = (ws, { channel, message, data }) => {
  const chan = channels.find(c => c.name === channel);

  if (chan === undefined) { return fail(ws, `channel ${channel} does not exist`); }

  switch (message) {
    case 'join':
      chan.join(ws);
      break;
    case 'leave':
      chan.leave(ws);
      break;
    case 'broadcast':
      chan.broadcast(ws, message, data);
    default:
      chan.onmessage(ws, message, data);
      break;
  }
}

const garbage = () => {
  if (!server) { return console.error('websocket/router: trying to garbage collect on non-existing server'); }

  remove(
    server.clients
      .filter(ws => ws.readyState !== WebSocket.OPEN)
  );
}

const remove = (clients) => {
  channels = channels
    .map(channel => channel.filter(client => clients.indexOf(client) > -1));
}

const addChannel = (channel) => {
  channels = [...channels, channel];
  return this;
}

const use = (wsserver) => { server = wsserver; }

module.exports = {
  use,
  addChannel,
  route,
}