import React, { Component } from "react";
import { getRelatedConcerts } from "../api.js";

import "./UserRelatedConcerts.css";
import { Link } from "react-router-dom";
function getConcertAddress(concert) {
  return `/concert-info/${concert.id}`;
}

class UserRelatedConcerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistConcerts: []
    };
  }

  componentDidMount() {
    getRelatedConcerts()
      // get data from our EXPRESS API
      .then(response => {
        // console.log(response.data);
        this.setState({
          artistConcerts: response.data
        });
      });
  }

  render() {
    const { artistConcerts } = this.state;
    return (
      <section className="TopArtists">
        <h1>You may also like.</h1>
        <span>\\\\\\\\\\\\\\</span>
        <p>Here are some Concerts we think you might enjoy</p>

        <div>
          {artistConcerts.map(oneArtist => {
            return (
              <div className="column-card">
                {oneArtist.resultsPage.results.event.map(oneEvent => {
                  console.log("hello aaaaaaaaaaaaaaaaa", oneEvent);
                  return (
                    <div>
                      {/* <p>
                        <span className="outline-text">{oneEvent.type}</span>
                        </p>
                      <h4>{oneEvent.venue.displayName}</h4> */}
                      <Link to={getConcertAddress(oneEvent)}>
                        <h3>{oneEvent.performance[0].displayName}</h3>
                      </Link>
                    </div>
                  );
                })}
                {/* <p>{oneArtist.popularity}</p>
                <img src={oneArtist.images[1].url} alt="img" /> */}
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

export default UserRelatedConcerts;
