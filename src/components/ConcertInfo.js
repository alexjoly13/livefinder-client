import React, { Component } from "react";
import { concertInfo } from "../api.js";
import { addConcert } from "../api.js";

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

    console.log(params);

    addConcert(params.concertId).then(response => {
      console.log("concert added", response.data);
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
        <button onClick={event => this.handleSubmit(event)}>ATTENDING</button>
      </section>
    );
  }
}

export default ConcertInfo;
