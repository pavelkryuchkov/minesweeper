import { LEVELS } from '../../constants';
import { changeLevelAction } from '../../reducers/boardStateReducer';

import Button from '../../components/Button/Button';

import styles from './styles.module.css';

function Settings({
  dispatchBoardAction,
  isDark,
  setIsResultsOpen,
  setIsSettingsOpen,
  setIsDark,
}) {
  return (
    <div className={styles.settings}>
      <Button
        title="Лёгкий уровень"
        onClick={() => {
          dispatchBoardAction(changeLevelAction(LEVELS[0]));
          setIsSettingsOpen(false);
        }}
        isDark={isDark}
      />
      <Button
        title="Средний уровень"
        onClick={() => {
          dispatchBoardAction(changeLevelAction(LEVELS[1]));
          setIsSettingsOpen(false);
        }}
        isDark={isDark}
      />
      <Button
        title="Сложный уровень"
        onClick={() => {
          dispatchBoardAction(changeLevelAction(LEVELS[2]));
          setIsSettingsOpen(false);
        }}
        isDark={isDark}
      />
      <Button
        title="Лучшее время"
        onClick={() => {
          setIsSettingsOpen(false);
          setIsResultsOpen(true);
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
