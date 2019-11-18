import React, { useState } from 'react';

import styles from './Dash.module.css';
import { getUser } from '../../utils/userState';

import Header from '../Common/Header';
import Column from './Column';
import GoalCard from './GoalCard';

const Dash = ({ history }) => {
  const [ col, setCol ] = useState(0);
  const [ goal, setGoal ] = useState(-1);
  const [ plan, setPlan ] = useState(-1);
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
          setId={(id) => {
            if (id !== -1) setCol(1);
            else setCol(0);
            setGoal(id)
          }}
          id={user.id}
        /> 
        <Column 
          history={history}
          user={user}
          title="Plans"
          type="Plan"
          CardComponent={GoalCard}
          disabled={col < 1}
          setId={(id) => {
            if (id !== -1) setCol(2);
            else setCol(1);
            setPlan(id)
          }}
          id={goal}
        />
        <Column 
          history={history}
          user={user}
          title="Tasks"
          type="Task"
          CardComponent={GoalCard}
          disabled={col < 2}
          id={plan}
        />
      </div>
    </div>
  )
}

export default Dash;