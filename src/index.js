import React from 'react';
import { render } from 'react-dom';
import 'normalize.css';

import App from './App';
import { GlobalStyles } from './global-styles';
import { FirebaseContext } from './contexts/firebase';
import { firebase } from './lib/firebase.prod';

render(
  <>
    <FirebaseContext.Provider value={{ firebase }}>
      <GlobalStyles />
      <App />
    </FirebaseContext.Provider>
  </>,
  document.getElementById('root')
);
