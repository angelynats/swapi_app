import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as localStorage from '../../utils/localStorage';
import * as sessionActions from '../../redux/session/sessionActions';
import * as characterActions from '../../redux/characters/characterActions';

import App from '../App/App';

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const items = localStorage.getItems();
    const user = localStorage.getUser();
    if (items) {
      dispatch(characterActions.refreshCharacters(items));
    }
    if (user) {
      dispatch(sessionActions.refreshUser(user));
    }
  });

  return <App />;
};

export default Root;

Root.propTypes = {
  refreshCharacters: PropTypes.func,
  refreshUser: PropTypes.func,
};
