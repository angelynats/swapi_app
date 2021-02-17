const MakeOptionsForSelector = characters => {
  return characters.map(character => {
    const name = character.name;
    const gender =
      character.gender !== 'n/a' ? character.gender : 'unknown gender';
    const homeworldName = character.homeworldName;
    const resultLabel = `${name}, ${gender}, ${homeworldName}`;
    return { value: character.id, label: resultLabel };
  });
};

export default MakeOptionsForSelector;
