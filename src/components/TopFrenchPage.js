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
      <section className="desktop-cards-section">
        <div className="desktop-card-heading flex-item1">
          <h3>Trending lives around you.</h3>

          <p>Discover which bands are trenging right now around you.</p>
          <hr className="small-hr" />
        </div>
        <div className="flex-item2">
          {topFrenchArtists.map(oneArtist => {
            return (
              <div>
                <hr />
                <h3>
                  {
                    oneArtist.resultsPage.results.event[0].performance[0]
                      .displayName
                  }
                </h3>
                <div className="inline-carousel desktop-caroussel">
                  {oneArtist.resultsPage.results.event.map(oneEvent => {
                    return (
                      <div key={oneEvent.displayName}>
                        <div className="inline-card-v2">
                          <span className="outline-text">{oneEvent.type}</span>
                          <span className="card-btn">{/* <Link to />+ */}</span>

                          <div className="card-text">
                            <div className="inline-card-v2-text">
                              <Link to={getConcertAddress(oneEvent)}>
                                <h4>{oneEvent.venue.displayName}</h4>
                                <hr />
                                <h3>{oneEvent.displayName}</h3>
                              </Link>
                            </div>
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
