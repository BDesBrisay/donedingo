import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import styles from './GoalCard.module.css';

const GoalCard = ({ 
  goal = {}, 
  select, 
  active 
}) => (
  <div 
    onClick={select}
    className={active
      ? styles.active
      : styles.contain
    }
  >
    <h4>{goal.title}</h4>
    <p>{formatDistanceToNow(new Date(goal.createdAt))}</p>
  </div>
);

export default GoalCard;