import axios from 'axios';

import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './reducer';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ axios }),
    loggingMiddleware,
  ),
);

export default store;
