import React from 'react';

import styles from './Dash.module.css';
import { getUser } from '../../utils/userState';

import Header from '../Common/Header';
import Goals from './Goals';

const Dash = ({ history }) => {
  const user = getUser();

  return (
    <div className={styles.contain}>
      <Header page="dash" />
      <div className={styles.grid}>
        <Goals 
          history={history}
          user={user}
        />
        <div className={styles.col}>
          <h4>Plan</h4>
        </div>
        <div className={styles.col}>
          <h4>Tasks</h4>
        </div>
      </div>
    </div>
  )
}

export default Dash;