import React, { Component } from "react";
import { concertInfo, userDashboard } from "../api.js";
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

  checkingIfAttending(currentUser) {
    const eventId = this.props.match.params.concertId;
    const currentUserConcert = this.props.currentUser.concert;
    const userConcertArray = [];
    currentUserConcert.forEach(oneId => {
      userConcertArray.push(oneId.id);
    });
    const compare = function(element) {
      return element - eventId === 0;
    };
    return userConcertArray.some(compare);
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
    const { currentUser } = this.props;
    return this.checkingIfAttending(currentUser) ? (
      <section>
        <section className="ConcertInfo">
          //{" "}
          <div className="concert-card">
            //{" "}
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
          </div>
          <h1>GREAT ! YOUR ARE ATTENDING THIS CONCERT !</h1>
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
      </section>
    ) : (
      <section>
        <section className="ConcertInfo">
          //{" "}
          <div className="concert-card">
            //{" "}
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
      </section>
    );
  }
}

export default ConcertInfo;

// this.state.isSubmitSuccessful ? (
//   <Redirect to="/connected" />
// ) : (
//   <section className="ConcertInfo">
//     <div className="concert-card">
//       {songkick.map(oneEvent => {
//         return (
//           <div>
//             <h1>{oneEvent.displayName}</h1>
//             <p>{oneEvent.type}</p>
//             <p>
//               {oneEvent.start.date}, {oneEvent.start.time}
//             </p>
//             <p>{oneEvent.venue.displayName}</p>
//             <p>{oneEvent.venue.street}</p>
//             <p>
//               {oneEvent.location.city}, {oneEvent.venue.zip}
//             </p>
//           </div>
//         );
//       })}

//       <button onClick={event => this.handleSubmit(event)}>
//         <h3>ATTENDING</h3>
//       </button>
//     </div>
//     {/* <header className="Header">
//       <h1>Next live for {songkick[0].displayName}</h1>
//       <span>\\\\\\\\\\\\\\</span>
//       <p>{concert.displayName}</p>
//     </header> */}
//     {/* <div className="inline-small-carousel">
//       <div className="inline-small-card" />
//       <div className="inline-small-card" />
//       <div className="inline-small-card" />
//       <div className="inline-small-card" />
//       <div className="inline-small-card" />
//       <div className="inline-small-card" />
//       <div className="inline-small-card" />
//       <div className="inline-small-card" />
//     </div> */}
//     {lastfm.map(oneArtist => {
//       return (
//         <div key={oneArtist.mbid}>
//           <h1>{oneArtist.name}</h1>

//           <h3>Total listeners: {oneArtist.stats.listeners}</h3>
//           <img src={this.oneImg(oneArtist.image[4])} alt="artist picto" />
//           <h4>
//             Similar Artists:
//             {oneArtist.similar.artist.map(oneSimilarArtist => {
//               return (
//                 <div key={oneSimilarArtist.url}>
//                   <p>{oneSimilarArtist.name}</p>
//                   <img
//                     src={this.oneImg(oneSimilarArtist.image[1])}
//                     alt="artist picto"
//                   />
//                 </div>
//               );
//             })}
//             <p>Genre :</p>
//             {oneArtist.tags.tag.map(oneGenre => {
//               return (
//                 <div key={oneGenre.url}>
//                   <p>{oneGenre.name}</p>
//                 </div>
//               );
//             })}
//           </h4>
//           <p>{oneArtist.bio.summary}</p>
//         </div>
//       );
//     })}
//   </section>
// );
