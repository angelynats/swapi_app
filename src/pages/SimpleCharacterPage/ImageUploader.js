import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as characterActions from '../../redux/characters/characterActions';
import { IconButton, Box, CardMedia } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

// import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  image: {
    height: 280,
    width: '100%',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  button: {
    height: 200,
    width: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: '5%',
    marginBottom: 30,
  },
  box: {
    height: 280,
    maxWidth: 280,
    marginBottom: 30,
    cursor: 'pointer',
    position: 'relative',
  },
  camera: {
    padding: 0,
    position: 'absolute',
    bottom: -3,
    right: -26,
  },
  delete: {
    padding: 0,
    position: 'absolute',
    bottom: 29,
    right: -26,
  },
}));

const ImageUploader = ({ character }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onAddImage = e => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        const imagePreview = reader.result;
        dispatch(
          characterActions.addCharacterImage(character.id, imagePreview),
        );
      };
    }
  };

  const onDeleteImage = () => {
    dispatch(characterActions.deleteCharacterImage(character.id));
  };

  return (
    <>
      <input
        onChange={onAddImage}
        accept="image/*"
        className={classes.input}
        id="add_image"
        type="file"
      />

      {character.image && (
        <>
          <Box className={classes.box}>
            <label htmlFor="add_image">
              <CardMedia
                component="img"
                alt={character.name}
                src={character.image}
                title={character.name}
                className={classes.image}
              />

              <IconButton
                component="div"
                color="primary"
                className={classes.camera}
                title="Change photo"
              >
                <PhotoCamera />
              </IconButton>
            </label>

            <IconButton
              component="div"
              className={classes.delete}
              title="Delete photo"
              onClick={onDeleteImage}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </>
      )}

      {!character.image && (
        <>
          <label htmlFor="add_image">
            <IconButton
              color="default"
              aria-label="upload picture"
              component="div"
              title="Add photo"
              className={classes.button}
            >
              <PhotoCamera style={{ fontSize: 40 }} />
            </IconButton>
          </label>
        </>
      )}
    </>
  );
};

export default ImageUploader;

ImageUploader.propTypes = {
  character: PropTypes.shape({
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

  addCharacterImage: PropTypes.func,
  deleteCharacterImage: PropTypes.func,
};
