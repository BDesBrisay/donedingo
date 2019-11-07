import React from 'react';

import { signOut } from '../../utils/userState';
import withContext from '../Context/withContext';
import styles from './Profile.module.css';

import Header from '../Common/Header';

class Profile extends React.Component {
  firebase = this.props.context.firebase

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header page="profile" />
        PROFILE
        <button onClick={() => signOut(this.firebase, history)}>
          SIGN OUT
        </button>
      </div>
    )
  }
}

export default withContext(Profile);