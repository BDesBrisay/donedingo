import React from 'react';

import styles from './GoalCard.module.css';

const GoalCard = ({ 
  goal = {}, 
  select, 
  active 
}) => (
  <div className={styles.contain}>
    <h4>{goal.title}</h4>
    <p>Created 4m ago</p>
  </div>
);

export default GoalCard;