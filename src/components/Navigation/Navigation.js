import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as sessionSelectors from '../../redux/session/sessionSelectors';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
    '&.active': {
      background: '#f50057',
      border: 0,
    },
  },
}));

const Navigation = () => {
  const classes = useStyles();

  const authenticated = useSelector(state =>
    sessionSelectors.isAuthenticated(state),
  );
  return (
    <>
      {!authenticated && (
        <Button
          color="inherit"
          variant="outlined"
          className={classes.menuButton}
          component={NavLink}
          to="/"
          exact
        >
          HOME
        </Button>
      )}

      {authenticated && (
        <>
          <Button
            color="inherit"
            variant="outlined"
            className={classes.menuButton}
            component={NavLink}
            to="/characters"
            exact
          >
            Characters
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            className={classes.menuButton}
            component={NavLink}
            to="/likes"
          >
            Likes
          </Button>
        </>
      )}
    </>
  );
};

export default Navigation;

Navigation.propTypes = {
  authenticated: PropTypes.bool,
};
