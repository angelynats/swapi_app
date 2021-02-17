import React, { useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as characterSelectors from '../../redux/characters/characterSelectors';
import * as characterActions from '../../redux/characters/characterActions';
import * as localStorage from '../../utils/localStorage';
import Films from './Films';
import Vehicles from './Vehicles';
import ImageUploader from './ImageUploader';

import {
  Container,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  Box,
  IconButton,
  Card,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: 30,
    padding: 30,
    minHeight: '100vh',
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  checkboxTitle: {
    fontWeight: 900,
  },
  checkboxLabel: {
    marginBottom: 40,
  },
  checkbox: {
    position: 'relative',
    top: -6,
  },
  boxCenter: {
    textAlign: 'center',
  },
  buttonBack: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '66%',
    margin: 'auto',
    padding: 40,
  },
}));

const SimpleCharacterPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { characterId } = useParams();
  const location = useLocation();
  const history = useHistory();

  const user = localStorage.getUser();
  const items = localStorage.getItems();
  const users = localStorage.getUsersFromStorage();

  const character = useSelector(state =>
    characterSelectors.getSimpleCharacterById(state, characterId),
  );

  useEffect(() => {
    if (!items && users) {
      const itemsFromStorage = localStorage.getItemsFromStorageByCurrentUser(
        user,
        users,
      );
      if (itemsFromStorage) {
        console.log(itemsFromStorage);
        dispatch(characterActions.refreshCharacters(itemsFromStorage));
      }
    } else if (!character) {
      return history.replace('/characters');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLikeChange = () => {
    dispatch(characterActions.likeCharacter(character.id));
  };

  const onGoBack = () => {
    if (location.state) {
      return history.push(location.state.from);
    }
    history.push('/characters');
  };

  const originalCharacters = useSelector(state =>
    characterSelectors.getCharacters(state),
  );

  useEffect(() => {
    localStorage.setItems(originalCharacters);
  }, [originalCharacters]);

  return (
    <main>
      {character && (
        <Paper elevation={3} className={classes.paper}>
          <Container maxWidth="md" className={classes.container}>
            <IconButton
              color="primary"
              variant="contained"
              component="span"
              onClick={onGoBack}
              className={classes.buttonBack}
              title="Back"
            >
              <ArrowBackIosIcon />
            </IconButton>

            <Box className={classes.boxCenter}>
              <FormControlLabel
                labelPlacement="start"
                className={classes.checkboxLabel}
                label={
                  <Typography
                    component="h1"
                    variant="h4"
                    color="primary"
                    gutterBottom
                    className={classes.checkboxTitle}
                  >
                    {character.name}
                  </Typography>
                }
                control={
                  <Checkbox
                    title={character.like ? 'Dislike' : 'Like'}
                    size="medium"
                    icon={<FavoriteBorder fontSize="large" />}
                    checkedIcon={<Favorite fontSize="large" />}
                    onChange={onLikeChange}
                    checked={character.like}
                    className={classes.checkbox}
                  />
                }
              />
            </Box>

            <Card className={classes.card}>
              <Box className={classes.boxSecondary}>
                <ImageUploader character={character} />

                {character.films.length !== 0 && (
                  <>
                    <Typography variant="h6" color="textPrimary">
                      Films:
                    </Typography>
                    <Films filmsURL={character.films} id={character.id} />
                  </>
                )}
              </Box>

              <Box className={classes.boxSecondary}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  Homeworld: {character.homeworldName}
                </Typography>

                {character.gender && (
                  <Typography variant="h6" color="textPrimary" gutterBottom>
                    Gender: {character.gender}
                  </Typography>
                )}

                <Typography variant="h6" color="textPrimary" gutterBottom>
                  Height: {character.height}
                </Typography>

                <Typography variant="h6" color="textPrimary" gutterBottom>
                  Mass: {character.mass}
                </Typography>

                {character.hair_color && (
                  <Typography variant="h6" color="textPrimary" gutterBottom>
                    Hair color: {character.hair_color}
                  </Typography>
                )}

                <Typography variant="h6" color="textPrimary" gutterBottom>
                  Skin color: {character.skin_color}
                </Typography>

                <Typography variant="h6" color="textPrimary" gutterBottom>
                  Eye color: {character.eye_color}
                </Typography>

                <Typography variant="h6" color="textPrimary" gutterBottom>
                  Year of birth: {character.birth_year}
                </Typography>

                {character.vehicles.length !== 0 && (
                  <Vehicles
                    vehiclesURL={character.vehicles}
                    id={character.id}
                  />
                )}
              </Box>
            </Card>
          </Container>
        </Paper>
      )}
    </main>
  );
};

export default SimpleCharacterPage;

SimpleCharacterPage.propTypes = {
  character: PropTypes.shape({
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
  }),
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
  refreshCharacters: PropTypes.func,
  likeCharacter: PropTypes.func,
};
