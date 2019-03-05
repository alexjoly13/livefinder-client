import React, { Component } from "react";
import { concertInfo } from "../api.js";
import { addConcert } from "../api.js";

class ConcertInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concert: {},
      myConcert: []
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    concertInfo(params.concertId).then(response => {
      this.setState({ concert: response.data.results.event });
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
    const { concert, myConcert } = this.state;
    console.log("concert INFO ------", concert);
    return (
      <section>
        <h2>Concert Info</h2>
        <p>{concert.displayName}</p>
        <button onClick={event => this.handleSubmit(event)}>ATTENDING</button>
      </section>
    );
  }
}

export default ConcertInfo;
