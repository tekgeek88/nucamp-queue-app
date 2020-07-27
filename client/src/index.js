import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import configureStore from "./store/store";

import App from './App';
import {Router} from "react-router-dom";
import {checkLoggedIn} from './actions/session'
import history from './history';

import * as serviceWorker from './serviceWorker';

const renderApp = async preloadedState => {
  const store = configureStore(preloadedState);
  ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>,
    document.getElementById('root')
  );
};
(async () => renderApp(await checkLoggedIn()))();

// If you want your app to work offline and load faster, you can change
// unregister() to signup() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
