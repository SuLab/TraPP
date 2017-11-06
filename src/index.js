import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import store, { history } from './store';
import { PrimaryLayout } from './containers/layout';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={PrimaryLayout} />
    </ConnectedRouter>
  </Provider>,
  target
);
registerServiceWorker();
