import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Landing.module.css';

const Landing = () => (
  <div className={styles.contain}>
    <header className={styles.header}>
      <h1 className={styles.logo}>Donedingo</h1>
      <p className={styles.tagline}>Project Tracking Simplified.</p>
      <Link to="/Dash">
        <button>
          SIGN IN
        </button>
      </Link>
    </header>
  </div>
);

export default Landing;