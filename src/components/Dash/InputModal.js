import React from 'react';

import styles from './InputModal.module.css';

import Input from './Input';

const InputModal = ({
  shown,
  type,
  add,
  close,
  text
}) => {
  const modalStyle = shown
    ? { opacity: 1, visibility: 'visible', zIndex: 5 }
    : { opacity: 0, visibility: 'hidden' };
  
  return (
    <div 
      className={styles.contain}
      style={modalStyle}
    >
      <div className={styles.background} onClick={close}></div>
      <div className={styles.modal}>
        <h2>New {type}</h2>
        <p>{text}</p>
        <Input 
          type={type}
          add={add}
          close={close}
        />
        <button onClick={close}>
          Close
        </button>
      </div>
    </div>
  )
}

export default InputModal;