import React, { Component } from "react";
import { concertInfo } from "../api.js";
import { addConcert } from "../api.js";
import { Redirect, Link } from "react-router-dom";

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
      this.setState({ isSubmitSuccessful: true });
    });
  }

  render() {
    const { artistName } = this.state;
    const { concert } = this.state;
    // console.log("looooooooooooooool", concert);
    return this.state.isSubmitSuccessful ? (
      <Redirect to="/connected" />
    ) : (
      <section className="ConcertInfo" />
    );
  }
}

export default ConcertInfo;
