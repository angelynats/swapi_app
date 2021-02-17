import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as sessionActions from '../../redux/session/sessionActions';
import * as localStorage from '../../utils/localStorage';
import withAuthRedirect from '../../utils/hoc/withAuthRedirect';
import FacebookLoginWithButton from 'react-facebook-login';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const FB_AP_ID = '240129627713751';

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 900,
    marginBottom: 40,
  },
}));

const SigninPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const componentClicked = () => {
    dispatch(sessionActions.signinRequest());
  };

  const responseFacebook = response => {
    dispatch(sessionActions.signinSuccess(response));
    localStorage.saveUser(response);
  };

  const failResponceFacebook = response => {
    dispatch(sessionActions.signinError(response));
  };

  return (
    <div>
      <Typography
        component="h1"
        variant="h5"
        align="center"
        color="textPrimary"
        paragraph
        className={classes.title}
      >
        SIGN IN
      </Typography>
      <FacebookLoginWithButton
        appId={FB_AP_ID}
        fields="name,email"
        onClick={componentClicked}
        callback={responseFacebook}
        onFailure={failResponceFacebook}
        icon="fa-facebook"
        size="medium"
        textButton="Sign In with Facebook"
        version="3.1"
        data-auto-logout-link="true"
      />
    </div>
  );
};

export default withAuthRedirect(SigninPage);

SigninPage.propTypes = {
  signinRequest: PropTypes.func,
  signinSuccess: PropTypes.func,
  signinError: PropTypes.func,
};
