import React, { Component } from "react";
import { concertInfo } from "../api.js";
import { addConcert } from "../api.js";
import { Redirect } from "react-router-dom";

import "./ConcertInfo.css";

class ConcertInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songkick: [],
      lastfm: [],
      isSubmitSuccessful: false
    };
  }

  componentDidMount() {
    console.log(this.props);
    const { params } = this.props.match;
    concertInfo(params.concertId).then(response => {
      const lastfmData = this.state.lastfm;
      const songkickData = this.state.songkick;
      songkickData.push(response.data[0]);
      lastfmData.push(response.data[1]);
      this.setState({
        songkick: songkickData,
        lastfm: lastfmData
        // artistName: response.data.results.event.performance[0].displayName
      });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { params } = this.props.match;
    addConcert(params.concertId).then(response => {
      this.props.addConcertToUser(response.data);
      this.setState({ isSubmitSuccessful: true });
    });
  }

  oneImg(el) {
    // console.log(el);

    return Object.values(el);
  }

  render() {
    const { isSubmitSuccessful, lastfm, songkick } = this.state;
    console.log("LASTFM", lastfm);
    console.log("SONGKICK", songkick);
    console.log(isSubmitSuccessful);
    return this.state.isSubmitSuccessful ? (
      <Redirect to="/connected" />
    ) : (
      <section className="ConcertInfo">
        {lastfm.map(oneArtist => {
          return (
            <div>
              <img
                className="bk-img"
                src={this.oneImg(oneArtist.image[4])}
                alt="artist picto"
              />
              <div key={oneArtist.mbid}>
                <div className="artist-header">
                  <div className="artist-card">
                    <img
                      className=""
                      src={this.oneImg(oneArtist.image[4])}
                      alt="artist picto"
                    />
                  </div>
                  <h1>{oneArtist.name}</h1>

                  <h3>Total listeners: {oneArtist.stats.listeners}</h3>
                </div>
                <hr className="small-hr" />
                <h3>Similar Artists.</h3>
                <div className="inline-small-carousel">
                  {oneArtist.similar.artist.map(oneSimilarArtist => {
                    return (
                      <div
                        className="inline-small-card"
                        key={oneSimilarArtist.url}
                      >
                        <h4>{oneSimilarArtist.name}</h4>
                        <img
                          src={this.oneImg(oneSimilarArtist.image[2])}
                          alt="artist picto"
                        />
                      </div>
                    );
                  })}
                </div>
                <hr className="small-hr" />
                <h3>Genre.</h3>
                <div className="genre-sec">
                  {oneArtist.tags.tag.map(oneGenre => {
                    return (
                      <div key={oneGenre.url}>
                        <h5>{oneGenre.name}</h5>
                      </div>
                    );
                  })}
                </div>
                <div className="summary">
                  <hr className="small-hr" />
                  <h3>Bio.</h3>
                  <p>{oneArtist.bio.summary}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="concert-card">
          {songkick.map(oneEvent => {
            return (
              <div>
                <h1>{oneEvent.displayName}</h1>
                <p>{oneEvent.type}</p>
                <p>
                  {oneEvent.start.date}, {oneEvent.start.time}
                </p>
                <p>{oneEvent.venue.displayName}</p>
                <p>{oneEvent.venue.street}</p>
                <p>
                  {oneEvent.location.city}, {oneEvent.venue.zip}
                </p>
              </div>
            );
          })}

          <button onClick={event => this.handleSubmit(event)}>
            <h3>ATTENDING</h3>
          </button>
        </div>
        {/* <header className="Header">
          <h1>Next live for {songkick[0].displayName}</h1>
          <span>\\\\\\\\\\\\\\</span>
          <p>{concert.displayName}</p>
        </header> */}
        {/* <div className="inline-small-carousel">
          <div className="inline-small-card" />
          <div className="inline-small-card" />
          <div className="inline-small-card" />
          <div className="inline-small-card" />
          <div className="inline-small-card" />
          <div className="inline-small-card" />
          <div className="inline-small-card" />
          <div className="inline-small-card" />
        </div> */}
      </section>
    );
  }
}

export default ConcertInfo;
