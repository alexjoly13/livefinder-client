import React, { Component } from "react";
import { concertInfo } from "../api.js";
import { addConcert } from "../api.js";
import { Redirect } from "react-router-dom";

import "./ConcertInfo.css";

class ConcertInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concert: {
        location: {},
        performance: [0],
        venue: {},
        artistName: "",
        isSubmitSuccessful: false
      }
    };
  }

  componentDidMount() {
    console.log(this.props);
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
    addConcert(params.concertId).then(response => {
      this.props.addConcertToUser(response.data);
      this.setState({ isSubmitSuccessful: true });
    });
  }

  render() {
    const { concert } = this.state;
    return this.state.isSubmitSuccessful ? (
      <Redirect to="/connected" />
    ) : (
      <section className="ConcertInfo">
        <header className="Header" />

        <div className="concert-card">
          <h4>{concert.venue.displayName}</h4>
          <hr />
          <h3>{concert.displayName}</h3>
          <p>
            {concert.venue.street}, {concert.venue.zip}
          </p>
          <p>
            {concert.location.country}
            {concert.location.city}.
          </p>
          <button onClick={event => this.handleSubmit(event)}>
            <h3>ATTENDING</h3>
          </button>
        </div>
      </section>
    );
  }
}

export default ConcertInfo;
