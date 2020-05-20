import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer.js';


const initialState = {};
const middleware = [thunk];

export default createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware),
);