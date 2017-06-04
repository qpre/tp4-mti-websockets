import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import RootReducer from '../reducers';

const createStoreWithMiddleWares = compose(
  // provides the ability to return a function from action creators
  applyMiddleware(thunk),
  // provides linking to Redux chrome extension
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = createStoreWithMiddleWares(combineReducers(RootReducer));

export default store;