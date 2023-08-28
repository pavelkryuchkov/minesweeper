import { changeLevelAction } from '../../reducers/boardStateReducer';

import Button from '../../components/Button/Button';

import styles from './styles.module.css';

function Settings({
  dispatchBoardAction,
  isDark,
  setIsSettingsOpen,
  setIsDark,
}) {
  return (
    <div className={styles.settings}>
      <Button
        title="Лёгкий уровень"
        onClick={() => {
          dispatchBoardAction(changeLevelAction('easy'));
          setIsSettingsOpen(false);
        }}
        isDark={isDark}
      />
      <Button
        title="Средний уровень"
        onClick={() => {
          dispatchBoardAction(changeLevelAction('medium'));
          setIsSettingsOpen(false);
        }}
        isDark={isDark}
      />
      <Button
        title="Сложный уровень"
        onClick={() => {
          dispatchBoardAction(changeLevelAction('hard'));
          setIsSettingsOpen(false);
        }}
        isDark={isDark}
      />
      <Button
        title={isDark ? 'Светлая тема' : 'Тёмная тема'}
        onClick={() => {
          setIsDark(!isDark);
          setIsSettingsOpen(false);
        }}
        isDark={isDark}
      />
    </div>
  );
}

export default Settings;
