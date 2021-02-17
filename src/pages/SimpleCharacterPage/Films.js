import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import * as characterOperations from '../../redux/characters/characterOperations';
import * as characterSelectors from '../../redux/characters/characterSelectors';

import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  list: {
    padding: 0,
  },
  listItem: {
    padding: 0,
    paddingLeft: 16,
  },
}));

const Films = ({ id, filmsURL }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const filmsNames = useSelector(state =>
    characterSelectors.getFilmNames(state, id),
  );

  useEffect(() => {
    if (filmsNames.length === 0) {
      filmsURL.map(f => dispatch(characterOperations.fetchFilm(id, f)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <List className={classes.list}>
        {filmsNames.map(film => (
          <ListItem key={shortid.generate()} className={classes.listItem}>
            <ListItemText
              component="h6"
              primary={
                <Typography variant="h6" color="textPrimary">
                  {film}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Films;

Films.propTypes = {
  filmsNames: PropTypes.arrayOf(PropTypes.string),
  fetchFilm: PropTypes.func,
};
