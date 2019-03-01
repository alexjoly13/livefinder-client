import React, { Component } from "react";

import { getTopArtist } from "../api.js";

// import axios from "axios";

class TopArtists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topArtists: []
    };
  }

  componentDidMount() {
    // console.log("it works");
    const { topArtists } = this.state;
    getTopArtist()
      // get data from our EXPRESS API
      .then(response => {
        this.setState({ topArtists: response.data });
        console.log("user top artists: ", topArtists);
      });
  }

  render() {
    const { topArtists } = this.state;
    console.log("hello top artist weshhhhhh", topArtists);
    return (
      <section className="TopArtists">
        <h2>Your next recommended concerts</h2>
        <ul>
          {topArtists.map(oneArtist => {
            return (
              <li>
                {oneArtist.resultsPage.results.event.map(oneEvent => {
                  return (
                    <div>
                      <h3>{oneEvent.displayName}</h3>
                      <p>{oneEvent.type}</p>
                      <p>{oneEvent.venue.displayName}</p>
                    </div>
                  );
                })}
                {/* <p>{oneArtist.popularity}</p>
                <img src={oneArtist.images[1].url} alt="img" /> */}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default TopArtists;
