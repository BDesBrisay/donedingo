import React from 'react';

import styles from './Dash.module.css';
import { getUser } from '../../utils/userState';

import Header from '../Common/Header';
// import Goals from './Goals';
import Column from './Column';
import GoalCard from './GoalCard';

const Dash = ({ history }) => {
  const user = getUser();

  return (
    <div className={styles.contain}>
      <Header page="dash" />
      <div className={styles.grid}>
        <Column 
          history={history}
          user={user}
          title="Goals"
          type="Goal"
          CardComponent={GoalCard}
        /> 
        <Column 
          history={history}
          user={user}
          title="Plans"
          type="Plan"
          CardComponent={GoalCard}
        />
        <Column 
          history={history}
          user={user}
          title="Tasks"
          type="Task"
          CardComponent={GoalCard}
        />
      </div>
    </div>
  )
}

export default Dash;