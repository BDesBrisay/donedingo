import React from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../../utils/userState';
import { DEFAULT_IMAGE } from '../../utils/contants';
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
              <button className={styles.profile}>
                <span role="img" aria-label="jsx-ally/accessible-emoji">&#x1f3e1;</span>
              </button>
            </Link>
          : <Link to="/Profile">
              <img 
                src={this.user.profileImage 
                  ? this.user.profileImage
                  : DEFAULT_IMAGE
                }
                alt=""
                className={styles.profile}
              />
            </Link>
        }
      </header>
    )
  }
}

export default Header;