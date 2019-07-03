import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/poll/:slug/" component={PollPage} />
        <Route exact path="/new/" component={AddPollPage} />
        <Route component={Error404Page} />
      </Switch>
    </Router>
  );
}

export default App;
