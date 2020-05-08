import {  combineReducers } from 'redux';
import {GET_ALL_DONOR, GET_ALL_RECIPIENT, NEW_RECIPIENT, DELETE_RECIPIENT, NEW_DONOR, DELETE_DONOR, UPDATE_DONOR} from '../action/';
import { LOGIN, LOGOUT, LOGUP, KEEP_IN } from '../action/authAction.js';

const initialState = {
  donorItems: [],
  recipientItems: [],
  newDonorItem: {},
  newRecipientItem: {},
};


export const reducer = function (state = initialState, action) {
  switch (action.type) {
  case GET_ALL_DONOR:
    return {...state, donorItems: action.payload };
  case NEW_DONOR:
    return {...state, newDonorItem: action.payload};
  case DELETE_DONOR:
    return {...state, newDonorItem: action.payload};
  case UPDATE_DONOR:
    return {...state, newDonorItem: action.payload};

  case GET_ALL_RECIPIENT:
    return {...state, recipientItems: action.payload};
  case NEW_RECIPIENT:
    return {...state, newRecipientItem: action.payload};
  case DELETE_RECIPIENT:
    return {...state, newRecipientItem: action.payload};
  default:
    return state;
  }
};
const initialStateAuth = {
  loggedIn: false,
  loading: false,
  token: '',
  user: {},
};
export const authReducer = function (state = initialStateAuth, action) {
  switch (action.type) {
  case LOGIN:
    return {...state, loggedIn: action.payload.loggedIn, loading: action.payload.loading, user: action.payload.user, token: action.payload.token };
  case LOGOUT:
    return {...state, loggedIn: action.payload.loggedIn, loading: action.payload.loading, user: action.payload.user, token: action.payload.token };
  case LOGUP:
    return {...state, loggedIn: action.payload.loggedIn, loading: action.payload.loading, user: action.payload.user, token: action.payload.token };
  case KEEP_IN:
    return {...state, loggedIn: action.payload.loggedIn, loading: action.payload.loading, user: action.payload.user, token: action.payload.token };
  default:
    return state;
  }
};
export default combineReducers({
  reducer: reducer,
  authReducer: authReducer,
});