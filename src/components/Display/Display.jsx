import styles from './styles.module.css';

function Display({ content }) {
  return <div className={styles.display}>{content}</div>;
}

export default Display;
