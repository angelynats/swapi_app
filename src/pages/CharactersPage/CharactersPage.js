import React, { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as localStorage from '../../utils/localStorage';
import * as characterOperations from '../../redux/characters/characterOperations';
import * as characterActions from '../../redux/characters/characterActions';
import CharactersSelector from '../../components/CharactersSelector/CharactersSelector';
import CharactersFilter from '../../components/CharactersFilter/CharactersFilter';
import { Container, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const AsyncCharactersList = lazy(() =>
  import(
    '../../components/CharactersList/CharactersList' /* webpackChunkName: 'likes-page'*/
  ),
);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontWeight: 900,
  },
  titleSecondary: {
    marginBottom: 40,
  },
  box: {
    flexGrow: 1,
  },
  paper: {
    margin: 30,
    padding: 30,
    minHeight: '100vh',
  },
}));

const CharactersPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = localStorage.getUser();
  const items = localStorage.getItems();
  const users = localStorage.getUsersFromStorage();

  useEffect(() => {
    if (!items && users) {
      const itemsFromStorage = localStorage.getItemsFromStorageByCurrentUser(
        user,
        users,
      );
      if (itemsFromStorage) {
        dispatch(characterActions.refreshCharacters(itemsFromStorage));
      }
    } else if (!items) {
      dispatch(characterOperations.fetchCharacters());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <Paper elevation={3} className={classes.paper}>
        <Container maxWidth="md" className={classes.root}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="primary"
            gutterBottom
            className={classes.title}
          >
            Characters of Star Wars
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
            className={classes.titleSecondary}
          >
            You can learn more about characters using select option, or just
            find a character in the list below using filter. Enjoy using!
          </Typography>
          <CharactersSelector />
          <CharactersFilter />
          <AsyncCharactersList />
        </Container>
      </Paper>
    </main>
  );
};

export default CharactersPage;

CharactersPage.propTypes = {
  refreshCharacters: PropTypes.func,
  fetchCharacters: PropTypes.func,
};
