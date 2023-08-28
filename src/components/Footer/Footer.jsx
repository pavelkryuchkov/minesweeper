import { useState } from 'react';

import Modal from '../Modal/Modal';
import Settings from '../Settings/Settings';

import styles from './styles.module.css';
import ResultsTable from '../ResultsTable/ResultsTable';

function Footer({ bestResults, dispatchBoardAction, isDark, setIsDark }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
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
            setIsResultsOpen={setIsResultsOpen}
            setIsSettingsOpen={setIsSettingsOpen}
            setIsDark={setIsDark}
          />
        </Modal>
      )}
      {isResultsOpen && (
        <Modal onClose={() => setIsResultsOpen(false)} isDark={isDark}>
          <ResultsTable results={bestResults} />
        </Modal>
      )}
    </footer>
  );
}

export default Footer;
