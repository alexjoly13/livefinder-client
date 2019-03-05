import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./GenericNextConcerts.css";
import { nextConcertsParis } from "./api";

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
          concertsParis: response.data.resultsPage.results.event
        });
      });
  }

  render() {
    const { concertsParis } = this.state;
    // console.log(concertsParis);
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
            </div>
          );
        })}
      </section>
    );
  }
}

export default NextConcertsParis;
