import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Profile.module.css';

const Profile = () => (
  <div>
    PROFILE
    <Link to="/">
      <button>
        SIGN OUT
      </button>
    </Link>
  </div>
)

export default Profile;