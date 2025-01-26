import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Render the root component of the application
ReactDOM.render(
  // Enable strict mode for additional checks and warnings
  <React.StrictMode>
    {/* Provide the Redux store to the entire application */}
    <Provider store={store}>
      {/* Use BrowserRouter for client-side routing */}
      <BrowserRouter>
        {/* Render the main App component */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  // Mount the application to the root element in the HTML document
  document.getElementById('root')
);
