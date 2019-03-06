import React, { Component } from "react";
import { spotiPlayer } from "../api.js";

function spliceToArray(array) {
  const randomNumber = Math.floor(Math.random() * 16) + 1;
  const secondNumber = randomNumber + 3;
  console.log(randomNumber, secondNumber);
  return array.splice(randomNumber, secondNumber);
}

class SpotiPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedArtists: []
    };
  }

  componentDidMount() {
    spotiPlayer().then(response => {
      this.setState({ relatedArtists: response.data.artists });
    });
  }

  render() {
    const { relatedArtists } = this.state;
    const spotArray = spliceToArray(relatedArtists);
    console.log(spotArray);
    return (
      <section>
        <h2>SPOTIFY PLAYER</h2>
        <ul>
          {spotArray.map(oneArtist => {
            const artistUrl = `https://open.spotify.com/embed/artist/${
              oneArtist.id
            }`;
            return (
              <div key={oneArtist.id}>
                <h4>{oneArtist.name}</h4>
                <iframe
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

export default SpotiPlayer;
