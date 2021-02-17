import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as sessionSelectors from '../../redux/session/sessionSelectors';

import Navigation from '../Navigation/Navigation';
import UserProfile from '../UserProfile/UserProfile';
import { AppBar, Box, Container, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing(2),
  },
  box: {
    flexGrow: 1,
  },
  toolbar: {
    padding: 0,
  },
}));

const AppBarA = () => {
  const classes = useStyles();

  const authenticated = useSelector(state =>
    sessionSelectors.isAuthenticated(state),
  );
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container fixed>
          <Toolbar className={classes.toolbar}>
            <Box display="flex" className={classes.box}>
              <Typography variant="h6" className={classes.title}>
                Star Wars
              </Typography>
              <Navigation />
            </Box>
            {authenticated && <UserProfile />}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default AppBarA;

AppBarA.propTypes = {
  authenticated: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    number: PropTypes.string,
  }),
  onLogOut: PropTypes.func,
};
