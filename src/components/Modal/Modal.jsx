import { createPortal } from 'react-dom';

import styles from './styles.module.css';

function Modal({ children, onClose, isDark }) {
  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={`${styles.modal} ${isDark ? styles.modal_dark : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById('modal')
  );
}

export default Modal;
