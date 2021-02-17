import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as localStorage from '../../utils/localStorage';
import * as characterActions from '../../redux/characters/characterActions';
import * as characterSelectors from '../../redux/characters/characterSelectors';
// import CharactersListItem from '../../components/CharactersListItem/CharactersListItem';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Container,
  Typography,
  Paper,
} from '@material-ui/core';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  list: {
    width: '80%',
    textAlign: 'center',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    fontWeight: 900,
    marginBottom: 40,
  },
  paper: {
    margin: 30,
    padding: 30,
    minHeight: '100vh',
  },
}));

const LikesPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  const user = localStorage.getUser();
  const items = localStorage.getItems();
  const users = localStorage.getUsersFromStorage();

  const characters = useSelector(state =>
    characterSelectors.getCharactersWithFilterLike(state),
  );

  useEffect(() => {
    if (!items && users) {
      const itemsFromStorage = localStorage.getItemsFromStorageByCurrentUser(
        user,
        users,
      );
      if (itemsFromStorage) {
        dispatch(characterActions.refreshCharacters(itemsFromStorage));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLikeChange = id => {
    dispatch(characterActions.likeCharacter(id));
  };

  return (
    <main>
      <Paper elevation={3} className={classes.paper}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="primary"
            className={classes.title}
          >
            My favourite characters
          </Typography>
          <>
            {characters.length > 0 && (
              <List className={classes.list}>
                {characters.map(character => (
                  <span key={character.id}>
                    <ListItem
                      button
                      component={Link}
                      to={{
                        pathname: `characters/${character.id}`,
                        state: { from: location },
                      }}
                    >
                      <ListItemText
                        color="textSecondary"
                        primary={character.name}
                      />
                      <ListItemSecondaryAction>
                        <Checkbox
                          title={character.like ? 'Dislike' : 'Like'}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          onChange={() => onLikeChange(character.id)}
                          checked={character.like}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </span>
                ))}
              </List>
            )}
            {characters.length === 0 && (
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                gutterBottom
              >
                You didn't choose anyone yet!
              </Typography>
            )}
          </>
        </Container>
      </Paper>
    </main>
  );
};

export default LikesPage;

LikesPage.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      birth_year: PropTypes.string,
      eye_color: PropTypes.string,
      films: PropTypes.arrayOf(PropTypes.string),
      filmsNames: PropTypes.arrayOf(PropTypes.string),
      gender: PropTypes.string,
      hair_color: PropTypes.string,
      height: PropTypes.string,
      homeworld: PropTypes.string.isRequired,
      homeworldName: PropTypes.string,
      like: PropTypes.bool.isRequired,
      image: PropTypes.string,
      mass: PropTypes.string,
      name: PropTypes.string.isRequired,
      skin_color: PropTypes.string,
      vehicles: PropTypes.arrayOf(PropTypes.string),
      vehiclesNames: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          model: PropTypes.string,
        }),
      ),
    }).isRequired,
  ),
  refreshCharacters: PropTypes.func,
  likeCharacter: PropTypes.func,
};
