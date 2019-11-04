import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import withContext from '../Context/withContext';
import { isSignedIn, signIn } from '../../utils/userState';
import styles from './Landing.module.css';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    if (isSignedIn()) props.history.push('/Dash');

    let priv = false;
    try {
      window.openDatabase(null, null, null, null);
    }
    catch (e) {
      priv = true;
    }

    this.state = {
      loading: false,
      private: priv
    }
  }

  firebase = this.props.context.firebase;

  uiConfig = {
    signInFlow: 'redirect',
    signInOptions: [
      this.firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult) => {
        if (authResult && !this.state.loading) {
          this.signInSuccess();
        }
        return false;
      }
    }
  };

  componentDidMount() {
    this.unregisterAuthObserver = this.firebase.auth().onAuthStateChanged(
      (user) => {
        if (user && !this.state.loading) {
          this.signInSuccess();
        }
      }
    );
  }

  signInSuccess = async () => {
    try {
      const { history, context } = this.props;
      this.setState({ loading: true });

      const data = await this.firebase.auth().currentUser;
      const token = await data.getIdToken(true);
      let user = data.providerData ? data.providerData[0] : {};

      // user = await context.userAuth(user);
      signIn({ token, user });

      history.push('/Dash');
    }
    catch (error) {
      console.error(error);
    }
  };

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    return (
      <div className={styles.contain}>
        <div className={styles.header}>
          <h1 className={styles.logo}>Donedingo</h1>
          <p className={styles.tagline}>Your private personal project tracker.</p>
          {this.state.private && 
            <h4 className={styles.errorMsg}>
              Private browsing may cause problems with sign in!
            </h4>
          }
          {this.state.loading && <p>Loading...</p>}
          {<StyledFirebaseAuth 
            uiConfig={this.uiConfig} 
            firebaseAuth={this.firebase.auth()} 
          />}
        </div>
      </div>
    );
  }
}

export default withContext(Landing);