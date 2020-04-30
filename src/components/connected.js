import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import TopArtistsLive from "./TopArtists";
import { getLogOut, postTokenLogin } from "../api.js";

import { fadeInDown } from "react-animations";
import Radium, { StyleRoot } from "radium";

import "./connected.css";

import UserRelatedConcerts from "./UserRelatedConcerts";
import TopFrenchPage from "./TopFrenchPage";
import AttendingEvent from "./AttendingEvent";
import Nav from "./nav";

class Connected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topArtists: [],
      topArtistName: [],
      concertArray: [],
      currentUser: { concert: [] },
    };
  }

  componentDidMount() {
    const { match, history } = this.props;

    if (match.params.loginToken) {
      postTokenLogin(match.params).then((response) => {
        history.replace("/connected");
        this.props.loggedIn(response.data);
      });
    }
  }

  logoutClick() {
    getLogOut().then((response) => {
      this.props.loggedIn(null);
    });
  }

  render() {
    const styles = {
      fadeInDown: {
        animation: "x 1.5s",
        animationName: Radium.keyframes(fadeInDown, "fadeInDown"),
      },
    };

    const { currentUser } = this.props;

    if (!this.props.currentUser) {
      return <p>Loading...</p>;
    }
    return (
      <section className="Connected">
        <StyleRoot>
          <header className="Header">
            <Nav style={styles.fadeInDown} />
            <div className="header-card" style={styles.fadeInDown}>
              <div className="header-text">
                <div className="img-flex">
                  <img
                    className="profilPic"
                    src={this.props.currentUser.image}
                    alt=""
                  />
                </div>
                <h1>Hi {this.props.currentUser.fullName}</h1>
                <hr />
                <h2>Kean for new concerts?</h2>
                <p>
                  Check out the next live bands arround, any trending concerts
                  arround any more.
                </p>
                <small>
                  <NavLink to="/">
                    <button
                      className="outline-text-black"
                      onClick={() => this.logoutClick()}
                    >
                      Log Out
                    </button>
                  </NavLink>
                </small>
              </div>
            </div>
          </header>
        </StyleRoot>

        <TopArtistsLive {...this.props} style={styles.fadeInDown} />
        <AttendingEvent {...this.props} style={styles.fadeInDown} />
        <UserRelatedConcerts {...this.props} style={styles.fadeInDown} />
        <TopFrenchPage {...this.props} style={styles.fadeInDown} />
      </section>
    );
  }
}

export default Connected;
