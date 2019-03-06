import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./GenericNextConcerts.css";
import { nextConcertsParis } from "../api";
import ArtistDetails from "./ArtistPage";

function getConcertAddress(concert) {
  return `/concert-info/${concert.id}`;
}

class NextConcertsParis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concertsParis: []
    };
  }

  componentDidMount() {
    nextConcertsParis()
      // get data from our EXPRESS API
      .then(response => {
        // console.log(response.data);
        this.setState({
          concertsParis: response.data
        });
      });
  }

  render() {
    const { concertsParis } = this.state;
    console.log(concertsParis);
    return (
      <section className="NextConcertsParis">
        <h3>Upcoming Concerts in Paris</h3>
        {concertsParis.map(oneConcert => {
          return (
            <div>
              <Link to={getConcertAddress(oneConcert)}>
                <h3>{oneConcert.displayName}</h3>
              </Link>
              <p>{oneConcert.type}</p>
              <p>{oneConcert.venue.displayName}</p>
              <ArtistDetails
                artistName={oneConcert.performance[0].artist.displayName}
              />
            </div>
          );
        })}
      </section>
    );
  }
}

export default NextConcertsParis;
