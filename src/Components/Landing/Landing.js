import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Landing.module.css';

const Landing = () => (
  <div className={styles.contain}>
    LANDING PAGE
    <Link to="/Dash">
      <button>
        SIGN IN
      </button>
    </Link>
  </div>
);

export default Landing;