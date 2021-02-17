import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as sessionActions from '../../redux/session/sessionActions';
import * as characterActions from '../../redux/characters/characterActions';
import * as sessionSelectors from '../../redux/session/sessionSelectors';
import * as localStorage from '../../utils/localStorage';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    marginRight: theme.spacing(2),
  },
}));

const UserProfile = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(state => sessionSelectors.getUser(state));

  const onLogOut = () => {
    const items = localStorage.getItems();
    const currentUser = localStorage.getUser();
    localStorage.saveCurrentUser(currentUser.id, items);
    localStorage.removeUser();
    localStorage.removeItems();
    history.replace('/');
    dispatch(sessionActions.logOut());
    dispatch(characterActions.clearCharacters());
  };

  return (
    <Box display="flex" className={classes.box}>
      <Typography variant="h6" className={classes.title}>
        {user.name}
      </Typography>

      <Button color="secondary" variant="contained" onClick={onLogOut}>
        LOG OUT
      </Button>
    </Box>
  );
};

export default UserProfile;

UserProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    userID: PropTypes.string,
    accessToken: PropTypes.string.isRequired,
  }),
  logOut: PropTypes.func,
  clearCharacters: PropTypes.func,
};
