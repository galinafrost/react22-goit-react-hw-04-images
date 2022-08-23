import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.close);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.close);
  }

  close = event => {
    const { close } = this.props;
    if (event.code === 'Escape') {
      close();
    }
    if (event.target === event.currentTarget) {
      close();
    }
  };

  render() {
    const { children, close } = this.props;

    return createPortal(
      <div onClick={close} className={styles.overlay}>
        <div className={styles.content}>
          <span onClick={close} className={styles.close}>
            X
          </span>
          {children}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node,
};
