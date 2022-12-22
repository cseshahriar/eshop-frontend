// react imports
import React from 'react';

// third party imports
import ReactDOM from 'react-dom/client';

// import store
import {Provider} from "react-redux";
import store from "./store";

// import css
import './index.css';
import './bootstrap.min.css';

// import components
import App from './App';
import reportWebVitals from './reportWebVitals';

// create root element and render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);
 
reportWebVitals();
