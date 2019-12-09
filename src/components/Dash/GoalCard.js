import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import styles from './GoalCard.module.css';

const GoalCard = ({ 
  goal = {}, 
  select, 
  active,
  del = () => {}
}) => (
  <div 
    onClick={select}
    className={active
      ? styles.active
      : styles.contain
    }
  > 
    <div className={styles.text}>
      <h4>{goal.title}</h4>
      <span>{formatDistanceToNow(new Date(goal.createdAt))} ago</span>
    </div>
    <button 
      className={styles.delete}
      onClick={(e = window.event) => {
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        
        del(goal.createdAt);
      }}
    >
      X
    </button>
  </div>
);

export default GoalCard;