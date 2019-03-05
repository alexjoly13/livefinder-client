import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getTopArtist } from "../api.js";

function getConcertAddress(concert) {
  return `/concert-info/${concert.id}`;
}
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
    const id = this.state.topArtists;
    // console.log(id);

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
                      <Link to={getConcertAddress(oneEvent)}>
                        <h3>{oneEvent.displayName}</h3>
                      </Link>
                      <p>{oneEvent.type}</p>
                      <p>{oneEvent.venue.displayName}</p>
                    </div>
                  );
                })}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default TopArtists;
