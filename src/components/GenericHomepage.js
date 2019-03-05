import React, { Component } from "react";
import "./GenericHomepage.css";
import { genericInfos } from "../api.js";

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
    console.log(el);

    return Object.values(el);
  }

  render() {
    const { franceTopArtists } = this.state;
    console.log(franceTopArtists);
    return (
      <section className="GenericInfosHome">
        <h2>Top Artists in France</h2>;
        {franceTopArtists.map(oneArtist => {
          return (
            <div key={oneArtist.mbid}>
              <h3>{oneArtist.name}</h3>
              <p>Listeners: {oneArtist.listeners}</p>
              <img src={this.oneImg(oneArtist.image[4])} />
            </div>
          );
        })}
      </section>
    );
  }
}

export default GenericInfosHome;
