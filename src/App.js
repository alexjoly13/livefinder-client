import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage.js";
import NotFound from "./components/NotFound.js";
import Connected from "./components/connected";
import TopFrenchPage from "./components/TopFrenchPage";
import UserRelatedConcerts from "./components/UserRelatedConcerts";
import GenericInfosHome from "./components/GenericHomepage";
import ConcertInfo from "./components/ConcertInfo.js";
import TestPage from "./components/Test";
import Dashboard from "./components/user-dashboard";
import SpotiPlayer from "./components/SpotiPlayer.js";
import AttendingEvent from "./components/AttendingEvent";
import PlayListPlayer from "./components/playListPlayer";

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
      <section className="App">
        <div className="body">
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
            <Route
              path="/concert-info/:concertId"
              render={props => (
                <ConcertInfo
                  match={props.match}
                  currentUser={this.state.currentUser}
                  addConcertToUser={user => this.updateUser(user)}
                />
              )}
            />
            <Route path="/spotiPlayer" component={SpotiPlayer} />
            <Route path="/playListPlayer" component={PlayListPlayer} />
            <Route path="/generic" component={GenericInfosHome} />
            <Route path="/test" component={TestPage} />
            <Route
              path="/attending-event"
              render={() => (
                <AttendingEvent currentUser={this.state.currentUser} />
              )}
            />
            <Route
              path="/user-dashboard"
              render={() => (
                <Dashboard
                  currentUser={this.state.currentUser}
                  onConcertDelete={user => this.updateUser(user)}
                />
              )}
            />

            <Route component={NotFound} />
          </Switch>
        </div>
        <footer>
          {/* <NavLink to="/connected">Home Page</NavLink>
          <NavLink to="/top-french">
            <button>Go to French Selection</button>
          </NavLink>
          <NavLink to="/similar-artist">
            <button>Our selection of similar concerts for you</button>
          </NavLink>
          <NavLink to="/user-dashboard">Your Dashboard</NavLink> */}
          <p>Made with 🎸 at Ironhack Paris</p>
        </footer>
      </section>
    );
  }
}

export default App;
