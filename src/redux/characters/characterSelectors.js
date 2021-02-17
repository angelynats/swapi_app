import { createSelector } from 'reselect';

export const getCharacters = state => (state ? state.characters.items : []);

export const getSimpleCharacterById = createSelector(
  [(state, id) => id, getCharacters],
  (id, characters) =>
    characters ? characters.find(character => character.id === id) : null,
);

export const getCharacterFilter = state => state.characters.filter;

export const getCharactersWithFilter = createSelector(
  [getCharacters, getCharacterFilter],
  (items, filter) => {
    if (filter === '') {
      return items;
    }
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    );
  },
);

export const getCharactersWithFilterLike = state => {
  const characters = getCharacters(state);
  const result =
    characters !== null ? characters.filter(character => character.like) : [];
  return result;
};

export const getFilmNames = createSelector(
  [(state, id) => id, getCharacters],
  (id, characters) => {
    const currentCharacter = characters.find(character => character.id === id);
    return currentCharacter.filmsNames;
  },
);

export const getVehicleNames = createSelector(
  [(state, id) => id, getCharacters],
  (id, characters) => {
    const currentCharacter = characters.find(character => character.id === id);
    return currentCharacter.vehiclesNames;
  },
);
