import Button from '../../components/Button/Button';

import styles from './styles.module.css';

function Settings({
  setFieldWidth,
  setFieldHeight,
  setBombsCount,
  setIsSettingsOpen,
  setIsDark,
  isDark,
}) {
  return (
    <div className={styles.settings}>
      <Button
        title="Лёгкий уровень"
        onClick={() => {
          setFieldWidth(9);
          setFieldHeight(9);
          setBombsCount(10);
          setIsSettingsOpen(false);
        }}
        isDark={isDark}
      />
      <Button
        title="Средний уровень"
        onClick={() => {
          setFieldWidth(16);
          setFieldHeight(16);
          setBombsCount(40);
          setIsSettingsOpen(false);
        }}
        isDark={isDark}
      />
      <Button
        title="Сложный уровень"
        onClick={() => {
          setFieldWidth(30);
          setFieldHeight(16);
          setBombsCount(99);
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
