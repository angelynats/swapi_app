import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as characterActions from '../../redux/characters/characterActions';
import { Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  boxFilter: {
    maxWidth: '50%',
    margin: 'auto',
  },
  filter: {
    width: '50%',
    marginLeft: 5,
  },
}));

const CharactersFilter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [filter, setFilter] = useState('');

  const onChangeFilter = e => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    dispatch(characterActions.filterCharacters(filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <Box className={classes.boxFilter}>
      <TextField
        type="text"
        id="filter"
        label="Filter..."
        value={filter}
        onChange={onChangeFilter}
        className={classes.filter}
      />
    </Box>
  );
};

CharactersFilter.propTypes = {
  filterCharacters: PropTypes.func,
};

export default CharactersFilter;
