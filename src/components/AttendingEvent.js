import React, { Component } from "react";
class AttendingEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="AttendingEvent">
        <div className="AttendingEvent-text">
          <h3>Your Attending Concert</h3>

          <p>Here are your next live events planned.</p>
          <hr className="small-hr" />
          <div className="flex-small-cards">
            <div className="small-card">
              <h3>Hello</h3>
            </div>
            <div className="small-card">
              <h3>Hello</h3>
            </div>
            <div className="small-card">
              <h3>Hello</h3>
            </div>
            <div className="small-card">
              <h3>Hello</h3>
            </div>
            <div className="small-card">
              <h3>Hello</h3>
            </div>
            <div className="small-card">
              <h3>Hello</h3>
            </div>
            <div className="small-card">
              <h3>Hello</h3>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default AttendingEvent;
