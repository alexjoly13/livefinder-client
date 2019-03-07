import React, { Component } from "react";
import { getTopPlaylist } from "../api.js";

class PlayListPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playListArray: []
    };
  }

  componentDidMount() {
    getTopPlaylist().then(response => {
      this.setState({ playListArray: response.data.items });
    });
  }

  render() {
    return (
      <section>
        <h2>PLAYLIST</h2>
      </section>
    );
  }
}

export default PlayListPlayer;
