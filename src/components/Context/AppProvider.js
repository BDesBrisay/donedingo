import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import userAuth from '../../firebase/userAuth';
import createPost from '../../firebase/createPost';
import deletePost from '../../firebase/deletePost';
import getPosts from '../../firebase/getPosts';
import checkTask from '../../firebase/checkTask';
import getStats from '../../firebase/getStats';

// Create React instance of context
export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);

    // Firebase config
    const config = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_ID
    };

    // Firebase init
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    // Get reference to Firebase DB
    const db = firebase.firestore();
    const users = db.collection('users');
    const goals = db.collection('goals');
    const plans = db.collection('plans');
    const tasks = db.collection('tasks');

    // Set context state to be used elsewhere
    this.state = {
      // Object References
      firebase,
      db,
      users,
      goals,
      plans,
      tasks,
      
      // Action functions
      userAuth: async ({ user }) => await userAuth({ 
        users, 
        user 
      }),
      createPost: async ({ type, post, id }) => await createPost({ 
        posts: this.dbFromType(type), 
        post, 
        id 
      }),
      getPosts: async ({ type, id }) => await getPosts({
        posts: this.dbFromType(type),
        id
      }),
      deletePost: async ({ type, createdAt, id }) => await deletePost({ 
        posts: this.dbFromType(type), 
        createdAt, 
        id 
      }),
      checkTask: async ({ index, id }) => await checkTask({ 
        posts: tasks, 
        index, 
        id 
      }),
      getStats: async ({ id }) => await getStats({
        goals,
        plans,
        tasks,
        id
      })
    }
  }

  dbFromType = (type = '') => {
    const first = type.charAt(0).toUpperCase();
    if (first === 'G') return this.state.goals;
    if (first === 'P') return this.state.plans;
    if (first === 'T') return this.state.tasks;
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
