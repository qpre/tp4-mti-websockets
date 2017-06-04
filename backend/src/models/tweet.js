const { Tweets } = require('../fixtures/tweets');

const all = () => Tweets;
const get = id => Tweets.find(t => t.id === id);
const add = ({ user_id, message }) => {
  const tweet = { id: Tweets.length + 1, user_id, message };
  Tweets.push(tweet);
  return tweet;
};

module.exports = {
  all,
  get,
  add,
};