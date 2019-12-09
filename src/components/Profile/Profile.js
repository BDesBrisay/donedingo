import React from 'react';

import { signOut, getUser } from '../../utils/userState';
import { DEFAULT_IMAGE } from '../../utils/contants';
import withContext from '../Context/withContext';
import styles from './Profile.module.css';

import Header from '../Common/Header';

class Profile extends React.Component {
  firebase = this.props.context.firebase
  user = getUser()
  state = {
    stats: ''
  }

  async componentDidMount() {
    const { context: { getStats = () => {} } } = this.props;
    const stats = await getStats({ id: this.user.id });
    this.setState({ stats });
  }

  render() {
    const { history } = this.props;
    const { stats } = this.state;
    return (
      <div className={styles.contain}>
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
          {stats !== '' && 
            <div className={styles.stats}>
              <div className={styles.stat}>
                <h1>{stats.goals}</h1>
                <p>Goals</p>
              </div>
              <div className={styles.stat}>
                <h1>{stats.plans}</h1>
                <p>Plans</p>
              </div>
              <div className={styles.stat}>
                <h1>{stats.tasks}</h1>
                <p>Tasks</p>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default withContext(Profile);