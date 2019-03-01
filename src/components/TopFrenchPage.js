import React, { Component } from "react";
import "./TopFrenchPage.css";
import { getTopFrench } from "../api.js";

class TopFrenchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topFrenchArtists: [],
      FrenchArtistsConcert: []
    };
  }

  componentDidMount() {
    getTopFrench()
      // get data from our EXPRESS API
      .then(response => {
        console.log("French top artists: ", response.data);
        this.setState({
          topFrenchArtists: response.data.albums.items
        });
      });
  }
  render() {
    const { topFrenchArtists } = this.state;
    return (
      <section>
        <h2>Connected, check console</h2>
        <ul>
          {topFrenchArtists.map(oneFrenchArtist => {
            return (
              <li>
                <h3>{oneFrenchArtist.artists[0].name}</h3>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default TopFrenchPage;
