import React, { Component } from "react";
import { signUpSpotify } from "../api.js";

import "./HomePage.css";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="HomePage">
        <h1>Live Me Up.</h1>
        <h2>Enjoy the full experience with Spotify</h2>
        <span>\\\\\\\\\\\\\\</span>
        <p>
          To enjoy the full experience, we recommand you to sync your acount
          with spotify. You also can sync your spotify account to facebook to
          live the social experience and see who is up for a live!
        </p>
        <div>
          <a href="http://localhost:8888/auth/spotify">Connect with Spotify</a>
          <a href="#0">Connect with Deezer</a>
          <a href="#0">Connect with Apple Music </a>
        </div>
        <hr />
        <small>Lorem ipsum nisi ut aliquip ex ea.</small>
      </section>
    );
  }
}

export default HomePage;
