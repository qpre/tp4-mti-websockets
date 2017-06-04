
class Channel {
  constructor(name) {
    this.name     = name;
    this.clients  = [];
    this.events   = {}; 
  }

  join(client) {
    this.clients = [...this.clients, client];
    this.onmessage(client, 'join');
  };

  leave(client) {
    this.clients = this.clients.filter(c => c !== client);
    this.onmessage(client, 'leave');
  };

  onmessage(client, message, data) {
    if (this.events[message] === undefined) { return; }

    this.events[message].forEach(handler => handler(client, data));
  }

  on(eventName, handler) {
    this.events[eventName] = [...(this.events[eventName] || []), handler];
  }

  off(eventName, handler) {
    this.events[eventName] = this.events[eventName] ?
      this.events[eventName].filter(h => h !== handler) :
      undefined;
  }

  send(client, message, data) {
    client.send(JSON.stringify({ name: this.name, message, data }));
  }

  broadcast(message, data) {
    this.clients
      .filter(c => c.readyState === c.OPEN)
      .forEach(c => c.send(JSON.stringify({ name: this.name, message, data })));
  }
}

module.exports = {
  Channel,
};