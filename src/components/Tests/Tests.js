import React from 'react';

import { signOut } from '../../utils/userState';
import withContext from '../Context/withContext';
import Indicator from './Indicator';

import userAuthTest from '../../tests/userAuthTest';

class Tests extends React.Component {
  state = {
    loading: true,
    userAuth: false
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
    const userAuth = await userAuthTest({ 
      users, 
      signOut: () => signOut(firebase, history) 
    });
    this.setState({ userAuth, loading: false });



    // signOut(firebase, history);
  }

  render() {
    const { history } = this.props;
    const { loading, userAuth } = this.state;
    return (
      <div>
        <h1>Firebase DB Tests</h1>
        <button onClick={() => history.goBack()}>
          Back
        </button>
        {loading 
          ? <p>Loading...</p>
          : <div>
              <p>User Auth Test: <Indicator val={userAuth} /></p>
            </div>
        }
      </div>
    )
  }
}

export default withContext(Tests);