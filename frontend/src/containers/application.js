import React from 'react';
import { Provider } from 'react-redux';
import Store from '../store';
import TweetList from './tweets/list';
import AddTweet from '../components/tweets/add';

// State will "flow" down from here thanks to the Provider component
const Application = () => (
  <div>
    <TweetList />
    <AddTweet />
  </div>
)

export default Application;