import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import IndexPage from './pages/IndexPage.jsx';
import PollPage from './pages/PollPage.jsx';
import AddPollPage from './pages/AddPollPage.jsx';
import Error404Page from './pages/Error404Page.jsx';

import reducer from './store/reducers/reducer';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = compose;

// TO DO : store
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/poll/:slug/" component={PollPage} />
        <Route exact path="/new/" component={AddPollPage} />
        <Route exact path="/admin/" />
        <Route component={Error404Page} />
      </Switch>
    </Provider>
)


function App() {
  return app;
}

export default App;
