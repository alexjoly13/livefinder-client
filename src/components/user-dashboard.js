import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteConcert } from "../api.js";
import SpotiPlayer from "./SpotiPlayer.js";
function getConcertAddress(concert) {
  return `/concert-info/${concert.id}`;
}

class Dashboard extends Component {
  handleSubmit(concert) {
    deleteConcert(concert.id).then(response => {
      this.props.onConcertDelete(response.data);
    });
  }

  render() {
    const { currentUser } = this.props;
    return (
      <section>
        <img src={currentUser.image} />
        <h2>Hello, {currentUser.fullName}</h2>
        <p>
          We display for you some of the informations regarding your account
        </p>
        <ul>
          <p>Here are some of the concert you are attending:</p>
          {currentUser.concert.map(oneEvent => {
            return (
              <li key={oneEvent.id}>
                <Link to={getConcertAddress(oneEvent)}>
                  <h3>{oneEvent.displayName}</h3>
                </Link>
                <button onClick={() => this.handleSubmit(oneEvent)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
        <h2>Discover some Artists with us:</h2>
        <SpotiPlayer {...this.props} />
      </section>
    );
  }
}

export default Dashboard;
