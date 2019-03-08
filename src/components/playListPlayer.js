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
      const spotiPlaylists = this.state.playListArray;
      const tempArray = [];
      response.data.items.forEach(oneItem => {
        spotiPlaylists.push(oneItem);
      });
      this.setState({ playListArray: spotiPlaylists });
    });
  }

  render() {
    const { playListArray } = this.state;
    return (
      <section>
        <h2>Your favourite Playlists</h2>
        <hr className="small-hr" />
        <ul>
          {playListArray.map(onePlaylist => {
            const artistUrl = `https://open.spotify.com/embed/user/spotify/playlist/${
              onePlaylist.id
            }`;
            return (
              <div key={onePlaylist.id}>
                <h4>{onePlaylist.name}</h4>
                <iframe
                  title={onePlaylist.name}
                  src={artistUrl}
                  width="300"
                  height="380"
                  frameBorder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                />
              </div>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default PlayListPlayer;
