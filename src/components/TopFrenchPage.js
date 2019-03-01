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
        <h2>Connected, check console</h2>
        <ul>
          {topFrenchArtists.map(oneArtist => {
            return (
              <li>
                {oneArtist.resultsPage.results.event.map(oneEvent => {
                  return (
                    <div>
                      <h3>{oneEvent.displayName}</h3>
                      <p>{oneEvent.type}</p>
                      <p>{oneEvent.venue.displayName}</p>
                    </div>
                  );
                })}
                {/* <p>{oneArtist.popularity}</p>
                <img src={oneArtist.images[1].url} alt="img" /> */}
              </li>
            );
          })}
        </ul>{" "}
      </section>
    );
  }
}

export default TopFrenchPage;
