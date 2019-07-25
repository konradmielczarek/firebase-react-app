import React from 'react';
import ReactDOM from 'react-dom';

// COMPONENTS
import App from './components/App';

// STYLES
import './assets/styles/app.scss';

// MOBX/STORES
import Firebase from './stores/FirebaseStore';
import { Provider } from 'mobx-react';

const stores = {
  firebaseStore: new Firebase()
}

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);
