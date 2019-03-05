import React, { Component } from "react";
import { concertInfo } from "../api.js";

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

  render() {
    const { artistName } = this.state;
    const { concert } = this.state;
    console.log("concert INFO ------", concert);
    console.log("Artist name :", artistName);
    return (
      <section>
        <h2>Concert Info</h2>
        <p>{concert.displayName}</p>
        <p>{concert.performance[0].displayName}</p>
        <p>{concert.location.city}</p>
      </section>
    );
  }
}

export default ConcertInfo;
