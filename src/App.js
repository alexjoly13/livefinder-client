import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage.js";
import NotFound from "./components/NotFound.js";
import Connected from "./components/connected";
import { getLogOut } from "./api.js";

class App extends Component {
  constructor(props) {
    super(props);
    let userData = localStorage.getItem("currentUser");
    if (userData) {
      userData = JSON.parse(userData);
    }

    this.state = {
      currentUser: userData
    };
  }

  updateUser(userInfo) {
    if (userInfo) {
      localStorage.setItem("currentUser", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("currentUser");
    }
    this.setState({ currentUser: userInfo });
  }

  logoutClick() {
    getLogOut().then(response => {
      console.log("LOGGED OUT");
      console.log(this.state.currentUser);

      this.updateUser(null);
    });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/connected/:loginToken?"
            render={props => {
              return (
                <Connected
                  currentUser={this.state.currentUser}
                  loggedIn={user => this.updateUser(user)}
                  match={props.match}
                  history={props.history}
                />
              );
            }}
          />{" "}
          <Route component={NotFound} />
        </Switch>
        <NavLink to="/">
          <button onClick={() => this.logoutClick()}>Log Out</button>
        </NavLink>
      </div>
    );
  }
}

export default App;
