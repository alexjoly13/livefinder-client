import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getTopArtist } from "../api.js";

import "./TopArtists.css";

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
    // const { topArtists } = this.state;
    getTopArtist()
      // get data from our EXPRESS API
      .then(response => {
        this.setState({ topArtists: response.data });
        // console.log("user top artists: ", topArtists);
        // console.log("user top artists: ", response.data);
      });
  }

  render() {
    const { topArtists } = this.state;

    console.log(topArtists);

    return (
      <section className="TopArtists">
        <h1>Your next recommended concerts.</h1>
        {/* <h2>Just for your</h2> */}
        <span>\\\\\\\\\\\\\\</span>
        <p>Check out the next live from your favorite top artists list.</p>
        <div>
          {console.log("hello top artist", topArtists)}
          {topArtists.map(oneArtist => {
            return (
              <div
                key={
                  oneArtist.resultsPage.results.event[0].performance[0]
                    .displayName
                }
              >
                <h3>
                  #
                  {
                    oneArtist.resultsPage.results.event[0].performance[0]
                      .displayName
                  }
                </h3>
                {/* {console.log("hello one artist", response.data)} */}

                <div className="inline-carousel">
                  {oneArtist.resultsPage.results.event.map(oneEvent => {
                    return (
                      <div key={oneEvent.displayName}>
                        <div className="inline-card">
                          <div>
                            <p>
                              <span className="outline-text">
                                {oneEvent.type}
                              </span>
                            </p>
                            <Link to={getConcertAddress(oneEvent)}>
                              <h3>{oneEvent.displayName}</h3>
                            </Link>
                            <h4>{oneEvent.venue.displayName}</h4>
                            <Link to={getConcertAddress(oneEvent)}>
                              <h3>{oneEvent.displayName}</h3>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <small> see more</small>
      </section>
    );
  }
}

export default TopArtists;
