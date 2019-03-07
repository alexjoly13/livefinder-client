import React, { Component } from "react";
import { getTest } from "../api";

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastfm: [],
      songkick: [],
      spotify: []
    };
  }

  componentDidMount() {
    getTest()
      // get data from our EXPRESS API
      .then(response => {
        // console.log(response.data[1].artist);
        const lastfmData = this.state.lastfm;
        const songkickData = this.state.songkick;
        lastfmData.push(response.data);
        // songkickData.push(response.data[0].resultsPage.results);
        this.setState({
          songkick: songkickData,
          lastfm: lastfmData
        });
      });
  }

  // componentDidMount() {
  //   // call function to link with backed
  //   this.setState({ artistTest: this.props });
  // }

  oneImg(el) {
    // console.log(el);

    return Object.values(el);
  }

  render() {
    const { lastfm, songkick } = this.state;
    console.log("Lastfm DATAq", lastfm);
    // const { songkick, lastfm } = this.state;

    // console.log(songkick, "++++++++++", lastfm);
    return (
      <section>
        <h1>TEST</h1>
        {/* {lastfm.map(oneArtist => {
          return (
            <div>
              <h2>{oneArtist.name}</h2>
              <p>Total Listeners: {oneArtist.stats.listeners}</p>
              <img src={this.oneImg(oneArtist.image[4])} alt="artist picto" />
              <p>{oneArtist.bio.content}</p>
            </div>
          );
        })}
        {songkick.map(oneData => {
          return (
            <div>
              <div>
                {oneData.event.map(oneEvent => {
                  return <h2>{oneEvent.displayName}</h2>;
                })}
              </div>
            </div>
          );
        })} */}
        {/* <img src={this.oneImg(lastfm.image[4])} alt="artist picto" />
         <p>{lastfm.bio.content}</p>  */}
      </section>
    );
  }
}

export default TestPage;
