import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import { BrowserRouter } from "react-router-dom";
import App from './App';
=======
import './styles/index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './redux/store';
>>>>>>> master


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<<<<<<< HEAD
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
=======
  <Provider store={store}>
    <App />
  </Provider>
);

>>>>>>> master
