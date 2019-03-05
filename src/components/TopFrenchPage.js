import React, { Component } from "react";
import "./TopFrenchPage.css";
import { getTopFrench } from "../api.js";

class TopFrenchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topFrenchArtists: []
    };
  }

  componentDidMount() {
    const { topFrenchArtists } = this.state;
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
        <h1>Trending lives around you.</h1>
        {/* <h2>Just for your</h2> */}
        <span>\\\\\\\\\\\\\\</span>
        <p>Discover which bands are trenging right now around you.</p>
        <div>
          {topFrenchArtists.map(oneArtist => {
            return (
              <div className="inline-carousel">
                {oneArtist.resultsPage.results.event.map(oneEvent => {
                  return (
                    <div>
                      <div className="inline-card">
                        <div>
                          <span className="outline-text">{oneEvent.type}</span>
                          <h4>{oneEvent.venue.displayName}</h4>
                          <h3>{oneEvent.displayName}</h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

export default TopFrenchPage;
