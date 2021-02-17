import Types from './Types';
import { combineReducers } from 'redux';

const userReducer = (state = null, { type, payload }) => {
  switch (type) {
    case Types.SIGNIN_SUCCESS:
      return payload.response;
    case Types.REFRESH_USER:
      return payload.response;
    case Types.LOGOUT:
      return null;
    default:
      return state;
  }
};

const authenticatedReducer = (state = false, { type, payload }) => {
  switch (type) {
    case Types.SIGNIN_SUCCESS:
    case Types.REFRESH_USER:
      return true;
    case Types.LOGOUT:
      return false;
    default:
      return state;
  }
};

const errorReducer = (state = null, { type, payload }) => {
  switch (type) {
    case Types.SIGNIN_ERROR:
      return payload.error;
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
  error: errorReducer,
  authenticated: authenticatedReducer,
});
