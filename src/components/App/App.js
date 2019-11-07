import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AuthRoute from './AuthRoute';
import Landing from '../Landing/Landing';
import Dash from '../Dash/Dash';
import Profile from '../Profile/Profile';

const App = () => (
  <BrowserRouter>
    <div>
      <Route path="/" exact component={Landing} />
      <AuthRoute path="/Dash" exact component={Dash} />
      <AuthRoute path="/Profile" exact component={Profile} />
    </div>
  </BrowserRouter>
);

export default App;
