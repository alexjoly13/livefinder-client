import React, { Component } from "react";
import { Link } from "react-router-dom";
import { userDashboard } from "../api.js";
function getConcertAddress(concert) {
  return `/concert-info/${concert.id}`;
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { concert: [] }
    };
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.setState({ currentUser: currentUser });
  }

  render() {
    const { currentUser } = this.state;
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
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default Dashboard;
