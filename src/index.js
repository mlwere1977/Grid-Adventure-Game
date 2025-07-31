// Importing the React library to use React components and APIs
import React from 'react';

// Import ReactDOM for rendering React elements into the DOM
import ReactDOM from 'react-dom/client';

// Import global CSS styles for the app (styling applies site-wide)
import './index.css';

// Import the top-level App component which contains the whole app UI and logic
import App from './App';

// Import the reportWebVitals utility to optionally measure app performance
import reportWebVitals from './reportWebVitals';


// Create a root DOM node where React will mount the game application
// `document.getElementById('root')` targets the <div id="root"></div> in the game HTML file
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renders the React app inside React's StrictMode (which helps identify potential problems)
// This renders the <App /> component into the root DOM node
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// --- Performance Measurement Section ---
// reportWebVitals is a tool for measuring real user performance metrics in the game app.
// By default, it does nothing but it can optionally enabled to log data or send to analytics.
//
// For example, to log results to the browser console, it can be coded to pass console.log:
// reportWebVitals(console.log);
//
// To learn more about web vitals and how to use this feature, visit:
// https://bit.ly/CRA-vitals

// Here it's called without arguments, so no performance reporting happens by default.
reportWebVitals();
