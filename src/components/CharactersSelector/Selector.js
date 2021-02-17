import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const Selector = ({ options, onChange }) => (
  <Select
    options={options}
    onChange={onChange}
    isClearable
    theme={theme => ({
      ...theme,
      colors: {
        ...theme.colors,
        primary: '#3f51b5',
      },
    })}
    styles={{
      option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        padding: 12,
        fontFamily: 'Roboto',
        cursor: 'pointer',
      }),
      noOptionsMessage: (provided, state) => ({
        ...provided,
        fontFamily: 'Roboto',
      }),
      placeholder: (provided, state) => ({
        ...provided,
        fontFamily: 'Roboto',
      }),
    }}
  />
);

export default Selector;

Selector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }).isRequired,
  ),
  onChange: PropTypes.func,
};
