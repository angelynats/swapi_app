import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Root from './components/Root/Root';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route>
        <Root />
      </Route>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
