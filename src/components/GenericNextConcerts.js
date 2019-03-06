import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./GenericNextConcerts.css";
import { nextConcertsParis } from "../api";

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
        <h1>Next Concerts in Paris</h1>

        <span>\\\\\\\\\\\\\\</span>
        <p>See the upcomming event in Paris</p>
        <div className="column-card-flex">
          {concertsParis.map(oneConcert => {
            return (
              <div className="column-card">
                <Link to={getConcertAddress(oneConcert)}>
                  <h3>{oneConcert.displayName}</h3>
                  <hr className="small-hr" />
                </Link>
                <p>{oneConcert.type}</p>
                <p>{oneConcert.venue.displayName}</p>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

export default NextConcertsParis;
