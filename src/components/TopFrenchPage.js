import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./TopFrenchPage.css";
import { getTopFrench } from "../api.js";

function getConcertAddress(concert) {
  return `/concert-info/${concert.id}`;
}

class TopFrenchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topFrenchArtists: []
    };
  }

  componentDidMount() {
    getTopFrench()
      // get data from our EXPRESS API
      .then(response => {
        console.log("French top artists: ", response.data);
        this.setState({
          topFrenchArtists: response.data
        });
      });
  }
  render() {
    const { topFrenchArtists } = this.state;
    return (
      <section>
        <h3>Trending lives around you.</h3>

        <p>Discover which bands are trenging right now around you.</p>
        <hr className="small-hr" />
        <div>
          {topFrenchArtists.map(oneArtist => {
            return (
              <div>
                <hr />
                <h2>
                  {
                    oneArtist.resultsPage.results.event[0].performance[0]
                      .displayName
                  }
                </h2>
                <div className="inline-carousel">
                  {oneArtist.resultsPage.results.event.map(oneEvent => {
                    return (
                      <div>
                        <div className="inline-card">
                          <div>
                            <span className="outline-text">
                              {oneEvent.type}
                            </span>
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
      </section>
    );
  }
}

export default TopFrenchPage;
