import React, { lazy, Suspense, useState } from 'react';
import withAuthRedirect from '../../utils/hoc/withAuthRedirect';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';
import { Container, Typography, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 900,
  },
  titleSecondary: {
    marginBottom: 40,
  },
  paper: {
    margin: 30,
    padding: 30,
    minHeight: '100vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const AsyncSignin = lazy(() =>
  import('../../components/Signin/Signin' /* webpackChunkName: 'signin-page'*/),
);

const HomePage = () => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);

  const onModalChange = () => {
    setModal(!modal);
  };

  return (
    <main>
      <Paper elevation={3} className={classes.paper}>
        <Container maxWidth="sm" className={classes.container}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="primary"
            gutterBottom
            className={classes.title}
          >
            Welcome to the Star Wars App!
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
            className={classes.titleSecondary}
          >
            To see all characters, please:
          </Typography>
          <Button
            color="primary"
            variant="contained"
            align="center"
            onClick={onModalChange}
          >
            SIGN IN
          </Button>
          {modal && (
            <Modal onClose={onModalChange}>
              <Suspense fallback={<Loader />}>
                <AsyncSignin />
              </Suspense>
            </Modal>
          )}
        </Container>
      </Paper>
    </main>
  );
};

export default withAuthRedirect(HomePage);
