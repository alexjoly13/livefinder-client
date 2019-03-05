import React, { Component } from "react";
import { concertInfo } from "../api.js";

class ConcertInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concert: {}
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    concertInfo(params.concertId).then(response => {
      this.setState({ concert: response.data.results.event });
    });
  }

  render() {
    const { concert } = this.state;
    console.log("concert INFO ------", concert);
    return (
      <section>
        <h2>Concert Info</h2>
        <p>{concert.displayName}</p>
        {/* <p>{concert.venue.street}</p> */}
      </section>
    );
  }
}

export default ConcertInfo;
