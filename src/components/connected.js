import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import "./connected.css";
import axios from "axios";
import { getLogOut } from "../api.js";

class Connected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topArtist: []
    };
  }

  componentDidMount() {
    const { match, history } = this.props;

    if (match.params.loginToken) {
      axios
        .post("http://localhost:8888/auth/token-login", match.params)
        .then(response => {
          console.log("Logged-In", response.data);
          history.replace("/connected");
          this.props.loggedIn(response.data);
        })
        .catch(err => alert("poop"));
    }
  }

  logoutClick() {
    getLogOut().then(response => {
      console.log("LOGGED OUT");
      console.log(this.state.currentUser);

      this.props.loggedIn(null);
    });
  }

  render() {
    const { currentUser } = this.props;

    // const { topArtist } = this.state;
    return (
      <section>
        <p>Connected</p>
        {currentUser && (
          <div>
            <h2>Bonjour, {currentUser.fullName}</h2>
            <p>Here are you infos:</p>
            <img src={currentUser.image} className="profilPic" />
            <ul>
              <li>Your ID: {currentUser.spotifyId}</li>
              <li>
                And your <a href={currentUser.spotifyLink}>link to Spotify</a>
              </li>
            </ul>
          </div>
        )}
        <NavLink to="/">
          <button onClick={() => this.logoutClick()}>Log Out</button>
        </NavLink>
      </section>
    );
  }
}

export default Connected;
