import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import "./connected.css";
import axios from "axios";
import TopArtists from "./TopArtists";
import { getLogOut } from "../api.js";

class Connected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topArtists: [],
      topArtistName: [],
      concertArray: []
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
    // const { currentUser } = this.props;
    // const { topArtist } = this.state;

    if (!this.props.currentUser) {
      return <p>Loading...</p>;
    }
    return (
      <section>
        {/* <img src={this.props.currentUser.} /> */}
        <h2>{this.props.currentUser.fullName}</h2>

        <TopArtists />
        <NavLink to="/top-french">
          <button>Go to French Selection</button>
        </NavLink>
        <NavLink to="/similar-artist">
          <button>Our selection of similar concerts for you</button>
        </NavLink>
        <NavLink to="/">
          <button onClick={() => this.logoutClick()}>Log Out</button>
        </NavLink>
      </section>
    );
  }
}

export default Connected;
