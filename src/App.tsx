import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import './App.scss';
import { Helmet } from 'react-helmet';
import Routing from './Routing';
import config from './config';

function App({ store, history }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" href={config.icon} />
        <title>{config.title}</title>
      </Helmet>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routing />
        </ConnectedRouter>
      </Provider>
    </>
  );
}

export default App;
