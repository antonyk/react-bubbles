import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import BubblesPage from './components/BubblesPage'
import ProtectedRoute from './components/ProtectedRoute'

import "./styles.scss";

function App() {

  const token = JSON.parse(localStorage.getItem('token'))

  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <ProtectedRoute path="/bubbles" component={BubblesPage} />
      </div>
    </Router>
  );
}

export default App;
