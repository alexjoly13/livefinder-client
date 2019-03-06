import React, { Component } from "react";
import { Link } from "react-router-dom";
function getConcertAddress(concert) {
  return `/concert-info/${concert.id}`;
}
class AttendingEvent extends Component {
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
    console.log(currentUser);
    return (
      <section className="AttendingEvent">
        <div className="AttendingEvent-text">
          <h3>Your Attending Concert</h3>

          <p>Here are your next live events planned.</p>
          <hr className="small-hr" />
          <div className="flex-small-cards">
            {currentUser.concert.map(oneEvent => {
              return (
                <div className="small-card">
                  <Link to={getConcertAddress(oneEvent)}>
                    <h3>{oneEvent.performance[0].displayName}</h3>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default AttendingEvent;
