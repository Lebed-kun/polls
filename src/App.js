import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import IndexPage from './pages/IndexPage.jsx';
import PollPage from './pages/PollPage.jsx';
import AddPollPage from './pages/AddPollPage.jsx';
import Error404Page from './pages/Error404Page.jsx';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/poll/:slug/" component={PollPage} />
        <Route exact path="/new/" component={AddPollPage} />
        <Route exact path="/admin/" />
        <Route component={Error404Page} />
      </Switch>
    </Router>
  );
}

export default App;
