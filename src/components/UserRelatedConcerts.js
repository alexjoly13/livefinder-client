import React, { Component } from "react";
import "./UserRelatedConcerts.css";
import { getRelatedConcerts } from "../api.js";

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
    // console.log("hello top artist weshhhhhh", artistConcerts);
    return (
      <section className="TopArtists">
        <h2>Here are some Concerts we think you might enjoy</h2>
        <ul>
          {artistConcerts.map(oneArtist => {
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
        </ul>
      </section>
    );
  }
}

export default UserRelatedConcerts;
