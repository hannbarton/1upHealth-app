import {createStore, applyMiddleware} from 'redux'
import axios from 'axios'
import {rootReducer} from './reducer'
import loggingMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware.withExtraArgument({axios}),
    loggingMiddleware
  )
)

export default store;

