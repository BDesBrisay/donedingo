import React from 'react';

import styles from './Dash.module.css';

import Header from '../Common/Header';

const Dash = () => (
  <div className={styles.contain}>
    <Header page="dash" />
    <div className={styles.grid}>
      <div className={styles.col}>
        <h4>Goals</h4>
      </div>
      <div className={styles.col}>
        <h4>Plan</h4>
      </div>
      <div className={styles.col}>
        <h4>Tasks</h4>
      </div>
    </div>
  </div>
)

export default Dash;