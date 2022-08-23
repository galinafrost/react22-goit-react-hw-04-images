import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ close, children }) => {
  const closes = event => {
    if (event.code === 'Escape' || event.target === event.currentTarget) {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closes);
    return () => document.removeEventListener('keydown', closes);
  }, []);

  return createPortal(
    <div onClick={closes} className={styles.overlay}>
      <div className={styles.content}>
        <span onClick={close} className={styles.close}>
          X
        </span>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node,
};
