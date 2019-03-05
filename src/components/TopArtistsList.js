import React, { Component } from "react";

import { getTopArtistsList } from "../api.js";

class TopArtistsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topArtistsList: []
    };
  }

  componentDidMount() {
    // console.log("it works");
    const { topArtistsList } = this.state;
    getTopArtistsList()
      // get data from our EXPRESS API
      .then(response => {
        this.setState({ topArtistsList: response.data });
        console.log("user top artists: ", topArtistsList);
      });
  }

  render() {
    return (
      <section className="TopArtistsList">
        <h2>hello top artists list</h2>
      </section>
    );
  }
}

export default TopArtistsList;
