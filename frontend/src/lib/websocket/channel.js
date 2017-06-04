// FIXME: well, at least it's only global to the module
const ws = new WebSocket('ws://localhost:4242');

class Channel {
  constructor(name) {
    this.name = name;
    this.events = {}; 
  }

  on(eventName, handler) {
    this.events[eventName] = [...(this.events[eventName] || []), handler];
  }

  off(eventName, handler) {
    this.events[eventName] = this.events[eventName] ?
      this.events[eventName].filter(h => h !== handler) :
      undefined;
  }

  join() {
    return new Promise((resolve) => {
      const onJoined = () => {
        resolve();
        this.off('joined', onJoined);
      };

      const onOpen = () => {
        ws.addEventListener('message', onMessage);
        this.send('join');
      };

      const onMessage = (response) => {
        const { channel, message, data } = JSON.parse(response.data);

        if (!this.name === channel) { return; }

        this.onmessage(message, data);
      };

      this.on('joined', onJoined);
      ws.addEventListener('open', onOpen);
    });
  }

  onmessage(message, data) {
    if (this.events[message] === undefined) { return; }

    this.events[message].forEach(handler => handler(data));
  }

  send(message, data) {
    ws.send(JSON.stringify({ channel: this.name, message, data }));
  }
}

export default Channel;