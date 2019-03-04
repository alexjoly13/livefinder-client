import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage.js";
import NotFound from "./components/NotFound.js";
import Connected from "./components/connected";
import TopFrenchPage from "./components/TopFrenchPage";
import UserRelatedConcerts from "./components/UserRelatedConcerts";

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

  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <header className="Header">
          <nav>
            <NavLink to="/">Home Page</NavLink>
          </nav>
        </header>
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
          />
          <Route path="/top-french" component={TopFrenchPage} />
          <Route path="/similar-artist" component={UserRelatedConcerts} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
