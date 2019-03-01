import React, { Component } from "react";

import { getTopArtist } from "../api.js";

import axios from "axios";

class TopArtists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topArtists: []
    };
  }

  componentDidMount() {
    getTopArtist()
      // get data from our EXPRESS API
      .then(response => {
        // always console.log result to see  to see what the api gave you
        console.log("user top artists: ", response.data);
        // save the JSON from the API into the state
        this.setState({ topArtists: response.data });
      });
  }

  render() {
    const { topArtists } = this.state;
    // console.log(topArtists);
    return (
      <section className="TopArtists">
        <h2>Top Artists</h2>
        <button onClick={event => this.userTopArtists(event)}>
          Search Top Artists
        </button>

        {/* <ul>
          {topArtists.map(oneTopArtist => {
            return (
              <li key={oneTopArtist.id}>
                <h3>name: {oneTopArtist.name}</h3>
                <p>{oneTopArtist.popularity}</p>
                <img src={oneTopArtist.images[1].url} alt="img" />
              </li>
            );
          })}
        </ul> */}
      </section>
    );
  }
}

export default TopArtists;
