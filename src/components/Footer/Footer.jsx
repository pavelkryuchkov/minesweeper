import { useState } from 'react';

import Modal from '../Modal/Modal';
import Settings from '../Settings/Settings';

import styles from './styles.module.css';

function Footer({ dispatchBoardAction, isDark, setIsDark }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <footer className={`${styles.footer} ${isDark ? styles.footer_dark : ''}`}>
      <button
        className={styles.button}
        onClick={() => setIsSettingsOpen(true)}
      />
      {isSettingsOpen && (
        <Modal onClose={() => setIsSettingsOpen(false)} isDark={isDark}>
          <Settings
            dispatchBoardAction={dispatchBoardAction}
            isDark={isDark}
            setIsSettingsOpen={setIsSettingsOpen}
            setIsDark={setIsDark}
          />
        </Modal>
      )}
    </footer>
  );
}

export default Footer;
