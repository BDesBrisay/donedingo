import React from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../../utils/userState';
import logo from '../../images/logo.png';
import styles from './Header.module.css';

class Header extends React.Component {
  user = getUser()

  render() {
    const { page } = this.props;

    return (
      <header className={styles.header}>
        <img 
          src={logo}
          className={styles.logo}
          alt=""
        />
        {page === 'profile'
          ? <Link to="/Dash">
              <button>
                Home
              </button>
            </Link>
          : <Link to="/Profile">
              <button>
                Profile
              </button>
            </Link>
        }
      </header>
    )
  }
}

export default Header;