import React, { Component } from "react";
import { concertInfo } from "../api.js";
import { addConcert } from "../api.js";

import "./ConcertInfo.css";

class ConcertInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concert: {
        location: {},
        performance: [0],
        venue: {},
        artistName: ""
      }
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    concertInfo(params.concertId).then(response => {
      this.setState({
        concert: response.data.results.event,
        artistName: response.data.results.event.performance[0].displayName
      });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { params } = this.props.match;

    // console.log(params);

    addConcert(params.concertId).then(response => {
      // console.log("concert added", response.data);
    });
  }

  render() {
    const { artistName } = this.state;
    const { concert } = this.state;
    console.log("concert INFO ------", concert);
    console.log("Artist name :", artistName);
    return (
      <section className="ConcertInfo">
        <header className="Header">
          {/* <h1>Next live for {concert.performance[0].displayName}</h1>
          <span>\\\\\\\\\\\\\\</span>
          <p>{concert.displayName}</p> */}
        </header>
        {/* <div className="inline-small-carousel">
          <div className="inline-small-card" />
          <div className="inline-small-card" />
          <div className="inline-small-card" />
          <div className="inline-small-card" />
          <div className="inline-small-card" />
          <div className="inline-small-card" />
          <div className="inline-small-card" />
          <div className="inline-small-card" />
        </div> */}

        <div className="concert-card">
          <h4>{concert.venue.displayName}</h4>
          <hr />
          <h3>{concert.displayName}</h3>
          {/* <p>{concert.performance[0].displayName}</p> */}
          <p>
            {concert.venue.street}, {concert.venue.zip}
          </p>
          <p>
            {concert.location.country}
            {concert.location.city}.
          </p>
          {/* <p>{concert}</p> */}
          <button onClick={event => this.handleSubmit(event)}>
            <h3>ATTENDING</h3>
          </button>
        </div>
      </section>
    );
  }
}

export default ConcertInfo;
