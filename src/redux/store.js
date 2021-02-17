import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import characterReducer from './characters/characterReducer';
import sessionReducer from './session/sessionReducer';

const rootReducer = combineReducers({
  characters: characterReducer,
  session: sessionReducer,
});

const enhancer = applyMiddleware(ReduxThunk);

const store = createStore(rootReducer, composeWithDevTools(enhancer));

export default store;
