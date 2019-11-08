import React from 'react';

import { signOut, getUser } from '../../utils/userState';
import { DEFAULT_IMAGE } from '../../utils/contants';
import withContext from '../Context/withContext';
import styles from './Profile.module.css';

import Header from '../Common/Header';

class Profile extends React.Component {
  firebase = this.props.context.firebase
  user = getUser()

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header page="profile" />
        <div className={styles.body}>
          <img 
            src={this.user.profileImage
              ? this.user.profileImage
              : DEFAULT_IMAGE
            }
            alt=""
            className={styles.profile}
          />
          <h1>{this.user.name}</h1>
          <p>{this.user.email}</p>
          <button onClick={() => signOut(this.firebase, history)}>
            SIGN OUT
          </button>
        </div>
      </div>
    )
  }
}

export default withContext(Profile);