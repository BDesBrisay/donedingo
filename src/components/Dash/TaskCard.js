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
      type="checkbox"
      checked={goal.checked}
      onChange={() => {}}
    />
    <h4>{goal.title}</h4>
    <span>{formatDistanceToNow(new Date(goal.createdAt))} ago</span>
    <button 
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

export default TaskCard;