import React from './node_modules/react';
import * as firebase from './node_modules/firebase/app';
import './node_modules/firebase/auth';

// import userAuth from '../../firebase/userAuth';

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);

    const config = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_ID
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    this.state = {
      firebase
    }
      // userAuth: async (user) => await userAuth({ users, user })
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
