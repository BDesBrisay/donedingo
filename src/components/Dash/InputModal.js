import React from 'react';

import styles from './InputModal.module.css';

import Input from './Input';

const InputModal = ({
  shown,
  type,
  add,
  close,
  id
}) => {
  const modalStyle = shown
    ? { opacity: 1, visibility: 'visible' }
    : { opacity: 0, visibility: 'hidden' };
  
  return (
    <div 
      className={styles.contain}
      style={modalStyle}
    >
      <div className={styles.background} onClick={close}></div>
      <div className={styles.modal}>
        <h2 className={styles.header}>New {type}</h2>
        <Input 
          type={type}
          add={add}
          close={close}
          id={id}
        />
        <button 
          onClick={close}
          className={styles.close}
        >
          &#x2715;
        </button>
      </div>
    </div>
  )
}

export default InputModal;