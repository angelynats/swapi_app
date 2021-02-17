import Types from './Types';

// FETCH CHARACTERS

export const fetchCharactersStart = () => ({
  type: Types.FETCH_CHARACTERS_START,
});

export const fetchCharactersSuccess = items => ({
  type: Types.FETCH_CHARACTERS_SUCCESS,
  payload: {
    items,
  },
});

export const fetchCharactersError = error => ({
  type: Types.FETCH_CHARACTERS_ERROR,
  payload: {
    error,
  },
});

// FETCH HOMEWORLD

export const fetchHomeworldSuccess = (id, homewold) => ({
  type: Types.FETCH_HOMEWORLD_SUCCESS,
  payload: {
    homewold,
    id,
  },
});

export const fetchHomeworldError = error => ({
  type: Types.FETCH_HOMEWORLD_ERROR,
  payload: {
    error,
  },
});

// FETCH FILMS

export const fetchFilmSuccess = (id, film) => ({
  type: Types.FETCH_FILM_SUCCESS,
  payload: {
    film,
    id,
  },
});

export const fetchFilmError = error => ({
  type: Types.FETCH_FILM_ERROR,
  payload: {
    error,
  },
});

// FETCH VEHICLES

export const fetchVehicleSuccess = (id, vehicle) => ({
  type: Types.FETCH_VEHICLE_SUCCESS,
  payload: {
    vehicle,
    id,
  },
});

export const fetchVehicleError = error => ({
  type: Types.FETCH_VEHICLE_ERROR,
  payload: {
    error,
  },
});

// FILTER

export const filterCharacters = filter => ({
  type: Types.FILTER_CHARACTERS,
  payload: {
    filter,
  },
});

// LIKE

export const likeCharacter = id => ({
  type: Types.LIKE_CHARACTER,
  payload: {
    id,
  },
});

// REFRESH ALL CHARACTERS

export const refreshCharacters = items => ({
  type: Types.REFRESH_CHARACTERS,
  payload: {
    items,
  },
});

// CLEAR STATE

export const clearCharacters = () => ({
  type: Types.CLEAR_CHARACTERS,
});

// ADD IMAGE

export const addCharacterImage = (id, image) => ({
  type: Types.ADD_CHARACTER_IMAGE,
  payload: {
    id,
    image,
  },
});

// DELETE IMAGE

export const deleteCharacterImage = id => ({
  type: Types.DELETE_CHARACTER_IMAGE,
  payload: {
    id,
  },
});
