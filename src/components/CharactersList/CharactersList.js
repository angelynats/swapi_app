import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as localStorage from '../../utils/localStorage';
import * as characterSelectors from '../../redux/characters/characterSelectors';
import * as characterActions from '../../redux/characters/characterActions';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Typography,
} from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  list: {
    maxWidth: '50%',
    textAlign: 'center',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    paddingLeft: 8,
  },
}));

const CharactersList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  const onLikeChange = id => {
    dispatch(characterActions.likeCharacter(id));
  };

  const characters = useSelector(state =>
    characterSelectors.getCharactersWithFilter(state),
  );

  const originalCharacters = useSelector(state =>
    characterSelectors.getCharacters(state),
  );

  useEffect(() => {
    localStorage.setItems(originalCharacters);
  }, [originalCharacters]);

  return (
    <>
      {characters && (
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
                  primary={
                    <Typography color="textPrimary">
                      {character.name}
                    </Typography>
                  }
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
    </>
  );
};

export default CharactersList;

CharactersList.propTypes = {
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
  originalCharacters: PropTypes.arrayOf(
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
  likeCharacter: PropTypes.func,
};
