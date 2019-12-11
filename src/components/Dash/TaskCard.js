import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import styles from './GoalCard.module.css';

const TaskCard = ({ 
  goal = {},
  del = () => {},
  check = () => {}
}) => (
  <div 
    onClick={check}
    className={styles.contain}
  >
    <input
      className={styles.input}
      type="checkbox"
      checked={goal.checked}
      onChange={() => {}}
    />
    <div className={styles.checkmark}></div>
    <div className={styles.text}>
      <h4 style={goal.checked ? { textDecoration: 'line-through', color: 'green' } : {}}>{goal.title}</h4>
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
      &#x2715;
    </button>
  </div>
);

export default TaskCard;