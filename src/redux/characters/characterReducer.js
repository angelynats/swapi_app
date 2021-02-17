import Types from './Types';
import { combineReducers } from 'redux';

const itemsReducer = (state = null, { type, payload }) => {
  switch (type) {
    case Types.FETCH_CHARACTERS_SUCCESS:
    case Types.REFRESH_CHARACTERS:
      return payload.items;
    case Types.LIKE_CHARACTER:
      return state.map(st => {
        return st.id === payload.id ? { ...st, like: !st.like } : st;
      });
    case Types.ADD_CHARACTER_IMAGE:
      return state.map(st => {
        return st.id === payload.id ? { ...st, image: payload.image } : st;
      });
    case Types.DELETE_CHARACTER_IMAGE:
      return state.map(st => {
        return st.id === payload.id ? { ...st, image: null } : st;
      });

    case Types.FETCH_HOMEWORLD_SUCCESS:
      return state.map(st => {
        return st.id === payload.id
          ? { ...st, homeworldName: payload.homewold }
          : st;
      });
    case Types.FETCH_FILM_SUCCESS:
      return state.map(st => {
        if (st.id === payload.id && !st.filmsNames.includes(payload.film)) {
          st.filmsNames.push(payload.film);
          return st;
        } else {
          return st;
        }
      });
    case Types.FETCH_VEHICLE_SUCCESS:
      return state.map(st => {
        return st.id === payload.id &&
          !st.vehiclesNames.includes(payload.vehicle)
          ? { ...st, vehiclesNames: [...st.vehiclesNames, payload.vehicle] }
          : st;
      });

    case Types.CLEAR_CHARACTERS:
      return null;
    default:
      return state;
  }
};

const loadingReducer = (state = false, { type, payload }) => {
  switch (type) {
    case Types.FETCH_CHARACTERS_START:
    case Types.FETCH_CHARACTER_BY_ID_START:
      return true;
    case Types.FETCH_CHARACTERS_SUCCESS:
    case Types.FETCH_CHARACTERS_ERROR:
    case Types.FETCH_CHARACTER_BY_ID_SUCCESS:
    case Types.FETCH_CHARACTER_BY_ID_ERROR:
    case Types.FETCH_HOMEWORLD_SUCCESS:
    case Types.FETCH_HOMEWORLD_ERROR:
    case Types.FETCH_FILM_SUCCESS:
    case Types.FETCH_FILM_ERROR:
    case Types.FETCH_VEHICLE_SUCCESS:
    case Types.FETCH_VEHICLE_ERROR:
      return false;
    default:
      return state;
  }
};

const errorReducer = (state = null, { type, payload }) => {
  switch (type) {
    case Types.FETCH_CHARACTERS_START:
    case Types.FETCH_CHARACTER_BY_ID_START:
      return null;
    case Types.FETCH_CHARACTERS_ERROR:
    case Types.FETCH_CHARACTER_BY_ID_ERROR:
    case Types.FETCH_HOMEWORLD_ERROR:
    case Types.FETCH_FILM_ERROR:
    case Types.FETCH_VEHICLE_ERROR:
      return payload.error;
    default:
      return state;
  }
};

const filterReducer = (state = '', { type, payload }) => {
  switch (type) {
    case Types.FILTER_CHARACTERS:
      return payload.filter;
    default:
      return state;
  }
};

export default combineReducers({
  items: itemsReducer,
  filter: filterReducer,
  loading: loadingReducer,
  error: errorReducer,
});
