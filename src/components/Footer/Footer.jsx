import { useState } from 'react';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Settings from '../Settings/Settings';

import styles from './styles.module.css';

function Footer({
  setFieldWidth,
  setFieldHeight,
  setBombsCount,
  setIsDark,
  isDark,
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <footer className={`${styles.footer} ${isDark ? styles.footer_dark : ''}`}>
      <button
        className={styles.button}
        onClick={() => setIsSettingsOpen(true)}
      ></button>
      {isSettingsOpen && (
        <Modal onClose={() => setIsSettingsOpen(false)} isDark={isDark}>
          <Settings
            setFieldHeight={setFieldHeight}
            setFieldWidth={setFieldWidth}
            setBombsCount={setBombsCount}
            setIsSettingsOpen={setIsSettingsOpen}
            setIsDark={setIsDark}
            isDark={isDark}
          />
        </Modal>
      )}
    </footer>
  );
}

export default Footer;
