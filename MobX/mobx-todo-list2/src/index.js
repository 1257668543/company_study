import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import articlesStore from './stores/articlesStore'
import usersStore from './stores/usersStore';
import { HashRouter } from 'react-router-dom';

const stores = {
  articlesStore: articlesStore,
  usersStore
}

ReactDOM.render(
  <Provider {...stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
