import styles from './styles.module.css';

function Button({ title, onClick, isDark }) {
  return (
    <button
      className={`${styles.button} ${isDark ? styles.button_dark : ''}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
