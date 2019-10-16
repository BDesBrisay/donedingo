import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Dash.module.css';

const Dash = () => (
  <div className={styles.contain}>
    <header className={styles.header}>
      <h3>Donedingo</h3>
      <Link to="/Profile">
        <button>
          Profile
        </button>
      </Link>
    </header>
    <div className={styles.grid}>
      <div className={styles.col}>
        <h4>Objectives</h4>
      </div>
      <div className={styles.col}>
        <h4>Key Results</h4>
      </div>
      <div className={styles.col}>
        <h4>Tasks</h4>
      </div>
    </div>
  </div>
)

export default Dash;