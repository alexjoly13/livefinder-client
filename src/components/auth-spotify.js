import React, { Component } from "react";
import { signUpSpotify } from "../api.js";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section>
        <a href="http://localhost:8888/auth/spotify">
          <img
            className="logo-spotify"
            src="/images/spotify-button.png"
            alt="log in with spotify"
          />
        </a>
      </section>
    );
  }
}

export default HomePage;
