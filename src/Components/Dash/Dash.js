import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Dash.module.css';

const Dash = () => (
  <div className={styles.contain}>
    DASHBOARD
    <Link to="/">
      <button>
        SIGN OUT
      </button>
    </Link>
  </div>
)

export default Dash;