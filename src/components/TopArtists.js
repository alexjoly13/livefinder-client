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
    console.log("it words");

    getTopArtist()
      // get data from our EXPRESS API
      .then(response => {
        console.log("user top artists: ", response.data);
        this.setState({ topArtists: response.data.tempArray });
      });
  }

  render() {
    const { tempArray } = this.state;
    console.log("hello top artist weshhhhhh", tempArray);
    return (
      <section className="TopArtists">
        {/* <h2>Top Artists</h2> */}
        {/* <button onClick={event => this.userTopArtists(event)}>
          Search Top Artists
        </button> */}

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
