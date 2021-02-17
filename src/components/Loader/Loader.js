import React from 'react';
import Loader from 'react-loader-spinner';
import classes from './Loader.module.css';

const LoaderCircle = () => (
  <div className={classes.wrapper}>
    <Loader
      type="TailSpin"
      color="#3f51b5"
      height={100}
      width={100}
      timeout={3000}
      className={classes.loader}
    />
  </div>
);

export default LoaderCircle;
