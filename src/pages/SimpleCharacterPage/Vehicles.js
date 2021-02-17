import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
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

const Vehicles = ({ id, vehiclesURL }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const vehiclesNames = useSelector(state =>
    characterSelectors.getVehicleNames(state, id),
  );

  useEffect(() => {
    if (vehiclesNames.length === 0) {
      vehiclesURL.map(v => dispatch(characterOperations.fetchVehicle(id, v)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h6" color="textPrimary">
        Vehicles:
      </Typography>
      <List className={classes.list}>
        {vehiclesNames.map(vehicle => (
          <ListItem key={shortid.generate()} className={classes.listItem}>
            <ListItemText
              component="h6"
              primary={
                <>
                  <Typography variant="h6" color="textPrimary">
                    {vehicle.name}
                  </Typography>
                  <Typography color="textSecondary">
                    model {vehicle.model}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Vehicles;

Vehicles.propTypes = {
  vehiclesNames: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      model: PropTypes.string,
    }),
  ),
  fetchVehicle: PropTypes.func,
};
