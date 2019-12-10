import React from 'react';

import { signOut } from '../../utils/userState';
import withContext from '../Context/withContext';
import Indicator from './Indicator';

import userAuthTest from '../../tests/userAuthTest';
import getPostsTest from '../../tests/getPostsTest';
import createPostTest from '../../tests/createPostTest';

class Tests extends React.Component {
  state = {
    userAuth: undefined,
    getPosts: undefined,
    createPost: undefined
  }

  componentDidMount() {
    this.runTests();
  }

  async runTests() {
    const {
      history,
      context: { 
        users, 
        goals, 
        firebase 
      }
    } = this.props;

    // USER AUTH TEST
    const userAuth = await userAuthTest({ 
      users, 
      signOut: () => signOut(firebase, history) 
    });
    this.setState({ userAuth });


    // GET POSTS TEST
    const getPosts = await getPostsTest({ posts: goals });
    this.setState({ getPosts });

    // CREATE POST TEST
    const createPost = await createPostTest({ posts: goals });
    this.setState({ createPost });

    // signOut(firebase, history);
  }

  render() {
    const { history } = this.props;
    const { 
      userAuth,
      getPosts,
      createPost
    } = this.state;

    return (
      <div>
        <h1>Firebase DB Tests</h1>
        <button onClick={() => history.goBack()}>
          Back
        </button>
        {userAuth !== undefined &&
          <div>
            <p>User Auth Test: <Indicator val={userAuth} /></p>
          </div>
        }
        {getPosts !== undefined &&
          <div>
            <p>Get Posts Test: <Indicator val={getPosts} /></p>
          </div>
        }
        {createPost !== undefined &&
          <div>
            <p>Create Post Test: <Indicator val={createPost} /></p>
          </div>
        }
        <p>Loading...</p>
      </div>
    )
  }
}

export default withContext(Tests);