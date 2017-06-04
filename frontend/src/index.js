// @flow
import React from 'react';
import { render } from 'react-dom';
import Root from './containers/root';

import TweetChannel from './services/tweets';

render(
  <Root />,
  document.getElementById('root')
);

TweetChannel.join();