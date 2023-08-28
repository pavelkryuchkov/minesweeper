import React from 'react';
import { LEVELS, RESULTS_LENGTH } from '../../constants';

import styles from './styles.module.css';

function ResultsTable({ results }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.th}>
          <th className={styles.th}></th>
          <th className={styles.th}>Лёгкий</th>
          <th className={styles.th}>Средний</th>
          <th className={styles.th}>Сложный</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(RESULTS_LENGTH).keys()]
          .map((i) => i + 1)
          .map((place) => (
            <tr key={place} className={styles.tr}>
              <td className={styles.td}>{`${place}.`}</td>
              <td className={styles.td}>
                {results[LEVELS[0]][place - 1] / 1000 || ''}
              </td>
              <td className={styles.td}>
                {results[LEVELS[1]][place - 1] / 1000 || ''}
              </td>
              <td className={styles.td}>
                {results[LEVELS[2]][place - 1] / 1000 || ''}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default ResultsTable;
