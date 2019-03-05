import React, { Component } from "react";
import { genericInfos } from "../api.js";
import NextConcertsParis from "./GenericNextConcerts";

import "./GenericHomepage.css";

class GenericInfosHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      franceTopArtists: []
    };
  }

  componentDidMount() {
    genericInfos()
      // get data from our EXPRESS API
      .then(response => {
        // console.log(response.data);
        this.setState({
          franceTopArtists: response.data.artist
        });
      });
  }

  oneImg(el) {
    // console.log(el);

    return Object.values(el);
  }

  render() {
    const { franceTopArtists } = this.state;
    console.log("aaaaaaaaaaaaaaa----------", franceTopArtists);
    // console.log(franceTopArtists);
    return (
      <section className="GenericInfosHome">
        <header>
          <h2>hello generic homepage</h2>
        </header>
        <h1>Top Artists in France</h1>
        <span>\\\\\\\\\\\\\\</span>
        <p>Discover what french people like to listen right now</p>
        {franceTopArtists.map(oneArtist => {
          return (
            <div className="column-card-with-image" key={oneArtist.mbid}>
              <img src={this.oneImg(oneArtist.image[4])} alt="artist picto" />
              <div className="column-card-with-image-text">
                <h3>{oneArtist.name}</h3>

                <p>{oneArtist.listeners} Listeners</p>
              </div>
            </div>
          );
        })}
        <NextConcertsParis />
      </section>
    );
  }
}

export default GenericInfosHome;
