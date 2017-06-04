import store from '../store';
import Channel from '../lib/websocket/channel';

import { add } from '../actions/tweets';

const TweetChannel = new Channel('entities:tweets');

TweetChannel.on('joined', () => TweetChannel.send('index'));

TweetChannel.on('index', (data) => {
  const { tweets } = store.getState();
  const toBeInserted = data.tweets.filter(t => tweets.find(lt => lt.id === t.id) === undefined);

  console.log(toBeInserted);

  // FIXME: this obviously sucks, implement batch insertion instead
  toBeInserted.forEach(({ id, user_id, message }) => {
    store.dispatch(add(id, user_id, message));
  })
});

TweetChannel.on('add', ({ id, user_id, message }) => {
  const { tweets } = store.getState();

  // have we already got it ?
  if (tweets.find(t => t.id === id) !== undefined) { return; }

  store.dispatch(add({ id, user_id, message }));
});

export default TweetChannel;