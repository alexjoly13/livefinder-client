import React, { Component } from "react";
import axios from "axios";

class Connected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    const { match, history } = this.props;

    if (match.params.loginToken) {
      axios
        .post("http://localhost:8888/auth/token-login", match.params)
        .then(response => {
          console.log("Logged-In", response.data);
          this.setState({ currentUser: response.data });
          history.replace("/connected");
        })
        .catch(err => alert("poop"));
    }
  }

  render() {
    return (
      <section>
        <p>Connected</p>
      </section>
    );
  }
}

export default Connected;
