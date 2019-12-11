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
  if (shown) {
    return (
      <div className={styles.contain}>
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
  else {
    return (
      <div></div>
    )
  }
}

export default InputModal;