import React, { Component } from "react";
import axios from "axios";
import TopArtists from "./TopArtists";

class Connected extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    if (!this.props.currentUser) {
      return <p>Loading...</p>;
    }
    return (
      <section>
        {/* <img src={this.props.currentUser.} /> */}
        <h2>{this.props.currentUser.fullName}</h2>

        <TopArtists />
      </section>
    );
  }
}

export default Connected;
