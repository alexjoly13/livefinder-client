import React, { Component } from "react";
import "./GenericNextConcerts.css";
import Axios from "axios";

class ArtistDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistIndex: [],
      artistTest: ""
    };
  }

  componentDidMount() {
    // call function to link with backed
    this.setState({ artistTest: this.props });
  }
  render() {
    const { artistTest } = this.state;
    console.log(artistTest);

    return <h1 value={artistTest.artistName}>{artistTest.artistName}</h1>;
  }
}

export default ArtistDetails;
