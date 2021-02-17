import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as characterSelectors from '../../redux/characters/characterSelectors';
import PropTypes from 'prop-types';

import Selector from './Selector';
import MakeOptionsForSelector from './MakeOptionsForSelector';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  boxSelector: {
    maxWidth: '50%',
    margin: 'auto',
    marginBottom: 20,
  },
}));

const CharactersSelector = () => {
  const classes = useStyles();
  const [options, setOptions] = useState([]);
  const history = useHistory();

  const characters = useSelector(state =>
    characterSelectors.getCharactersWithFilter(state),
  );

  useEffect(() => {
    if (characters) {
      setOptions(MakeOptionsForSelector(characters));
    }
  }, [characters]);

  const onClickCharacter = opt => {
    history.push(`characters/${opt.value}`);
  };

  return (
    <>
      {characters && (
        <Box className={classes.boxSelector}>
          <Selector
            menuShouldScrollIntoView
            options={options}
            isSearchable
            onChange={onClickCharacter}
          />
        </Box>
      )}
    </>
  );
};

export default CharactersSelector;

CharactersSelector.propTypes = {
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
};
