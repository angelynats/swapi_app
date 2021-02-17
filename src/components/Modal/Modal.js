import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import CloseIcon from '@material-ui/icons/Close';

const Modal = ({ onClose, children }) => {
  const backdropRef = useRef(null);

  const handleKeyPress = e => {
    if (e.code !== 'Escape') return;
    onClose();
  };

  const handleBackdropClick = e => {
    if (backdropRef.current && e.target !== backdropRef.current) return;
    onClose();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={styles.overlay}
      ref={backdropRef}
      onClick={handleBackdropClick}
    >
      <div className={styles.modal}>
        <button type="button" onClick={onClose} className={styles.button}>
          <CloseIcon className={styles.svg_close}></CloseIcon>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};
