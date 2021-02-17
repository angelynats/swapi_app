import axios from 'axios';
import api from '../../utils/api/api';
import shortid from 'shortid';
import {
  fetchCharactersStart,
  fetchCharactersSuccess,
  fetchCharactersError,
  fetchHomeworldSuccess,
  fetchHomeworldError,
  fetchFilmSuccess,
  fetchFilmError,
  fetchVehicleSuccess,
  fetchVehicleError,
} from './characterActions';

const fetchAsyncHomeworld = async url => {
  const fetch = url => axios.get(url);
  try {
    const response = await fetch(url);
    return response.data.name;
  } catch (err) {
    throw err;
  }
};

export const fetchCharacters = () => dispatch => {
  dispatch(fetchCharactersStart());
  let results = [];

  const fetchAllCharacters = async page => {
    const fetch = page => api.get(`/people/?page=${page}`);
    try {
      const response = await fetch(page);
      results = results.concat(response.data.results);
      if (response.data.next) {
        return fetchAllCharacters(page + 1);
      }
      return results;
    } catch (err) {
      throw err;
    }
  };

  fetchAllCharacters(1)
    .then(response => {
      response.map(character => {
        character.id = shortid.generate();
        character.like = false;
        character.image = null;
        character.filmsNames = [];
        character.vehiclesNames = [];
        dispatch(fetchCharactersSuccess(response));

        return fetchAsyncHomeworld(character.homeworld)
          .then(res => {
            dispatch(fetchHomeworldSuccess(character.id, res));
          })
          .catch(error => {
            dispatch(fetchHomeworldError(error));
          });
      });
    })
    .catch(error => {
      dispatch(fetchCharactersError(error));
    });
};

export const fetchFilm = (id, filmURL) => dispatch => {
  axios
    .get(filmURL)
    .then(res => {
      dispatch(fetchFilmSuccess(id, res.data.title));
    })
    .catch(error => {
      dispatch(fetchFilmError(error));
    });
};

export const fetchVehicle = (id, vehicleURL) => dispatch => {
  axios
    .get(vehicleURL)
    .then(res => {
      const name = res.data.name;
      const model = res.data.model;
      const vehicleObject = { name, model };

      dispatch(fetchVehicleSuccess(id, vehicleObject));
    })
    .catch(error => {
      dispatch(fetchVehicleError(error));
    });
};
