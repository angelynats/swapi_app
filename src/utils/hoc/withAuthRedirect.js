import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as sessionSelectors from '../../redux/session/sessionSelectors';

const withAuthRedirect = BaseComponent => {
  const WithAuthRedirect = () => {
    const authenticated = useSelector(state =>
      sessionSelectors.isAuthenticated(state),
    );
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
      if (!authenticated) {
        return;
      }
      history.replace('/characters');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (!authenticated) {
        return;
      }
      if (location.state && location.state.from) {
        return history.replace(location.state.from);
      }

      history.replace('/characters');
    }, [authenticated, history, location.state]);

    return <BaseComponent />;
  };

  return WithAuthRedirect;
};

export default withAuthRedirect;
