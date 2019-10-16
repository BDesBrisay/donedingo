import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from '../Landing/Landing';
import Dash from '../Dash/Dash';

const App = () => (
  <BrowserRouter>
    <div>
      <Route path="/" exact component={Landing} />
      <Route path="/Dash" exact component={Dash} />
    </div>
  </BrowserRouter>
);

export default App;
