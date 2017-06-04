import React from 'react';
import { Provider } from 'react-redux';
import Store from '../store';
import Application from './Application';

// State will "flow" down from here thanks to the Provider component
const Root = () => (
  <Provider store={Store}>
    <Application />
  </Provider>
)

export default Root;