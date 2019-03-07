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

    // console.log(params);

    addConcert(params.concertId).then(response => {
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
        {lastfm.map(oneArtist => {
          return (
            <div key={oneArtist.mbid}>
              <h1>{oneArtist.name}</h1>

              <h3>Total listeners: {oneArtist.stats.listeners}</h3>
              <img src={this.oneImg(oneArtist.image[4])} alt="artist picto" />
              <h4>
                Similar Artists:
                {oneArtist.similar.artist.map(oneSimilarArtist => {
                  return (
                    <div key={oneSimilarArtist.url}>
                      <p>{oneSimilarArtist.name}</p>
                      <img
                        src={this.oneImg(oneSimilarArtist.image[1])}
                        alt="artist picto"
                      />
                    </div>
                  );
                })}
                <p>Genre :</p>
                {oneArtist.tags.tag.map(oneGenre => {
                  return (
                    <div key={oneGenre.url}>
                      <p>{oneGenre.name}</p>
                    </div>
                  );
                })}
              </h4>
              <p>{oneArtist.bio.summary}</p>
            </div>
          );
        })}
      </section>
    );
  }
}

export default ConcertInfo;
