import React, { Component } from "react";
import { spotiPlayer } from "../api.js";

function sliceToArray(array) {
  const randomNumber = Math.floor(Math.random() * 16) + 1;
  const secondNumber = randomNumber + 3;
  console.log(randomNumber, secondNumber);
  return array.slice(randomNumber, secondNumber);
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
    console.log(relatedArtists.length);
    const spotArray = sliceToArray(relatedArtists);
    console.log(spotArray);
    return (
      <section>
        <h3>Discover some Artists with us</h3>
        <p>Check the Random Players to discover or remember new artists</p>
        <hr className="small-hr" />
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
                  height="80"
                  frameBorder="10"
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
