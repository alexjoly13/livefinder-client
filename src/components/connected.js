import React, { Component } from "react";
import "./connected.css";
import axios from "axios";

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

  // getArtist() {
  //   const { artistArray } = this.state;
  //   axios.get("https://api.spotify.com/v1/me/top/{artists}");
  //   this.setState({ topArtist: artistArray });
  // }

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
      </section>
    );
  }
}

export default Connected;
