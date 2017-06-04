const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const http = require('http');

const Router = require('./router');

const onConnection = (ws) => {
  ws.on('message', (json) => {
    const data = JSON.parse(json);
    Router.route(ws, data);
  });
};

const start = (port = 4242) => {
  const app = express();
  const HTTPServer = http.createServer(app);

  app.options('*', cors());

  const WSServer = new WebSocket.Server({ server: HTTPServer });

  Router.use(WSServer);

  WSServer
    .on('connection', ws => onConnection(ws));

  HTTPServer.listen(port);

  return {
    WSServer,
    HTTPServer,
    Router,
  };
}

module.exports = {
  start,
};
