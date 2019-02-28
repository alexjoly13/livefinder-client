import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage.js";
import NotFound from "./components/NotFound.js";
import Connected from "./components/connected";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/connected/:loginToken?" component={Connected} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
