import React, { Component } from "react";
import axios from "axios";

class Connected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topArtists: [],
      topArtistName: [],
      concertArray: []
    };
  }

  componentDidMount() {
    const { match, history } = this.props;

    if (match.params.loginToken) {
      axios
        .post("http://localhost:8888/auth/token-login", match.params)
        .then(response => {
          console.log("Logged-In", response.data);
          history.replace("/connected");
          this.props.loggedIn(response.data);
        })
        .catch(err => alert("poop"));
    }
  }

  userTopTracks() {
    const url =
      "https://api.spotify.com/v1/me/top/artists?limit=20&time_range=short_term";
    const accessToken = "Bearer " + { spotify_token };
    axios
      .get(url, { headers: { Authorization: accessToken } })
      .then(response => {
        console.log(response.data.items);
        const artistName = this.state.topArtistName;
        response.data.items.forEach(oneArtist => {
          console.log(oneArtist.name);
          artistName.push(oneArtist.name);
        });
        // artistName.push(response.data.items.name);
        this.setState({
          topArtists: response.data.items,
          topArtistName: artistName
        });
        console.log(artistName);
        const eventIndex = artistName.map(oneQuery => {
          return axios.get(
            `https://api.songkick.com/api/3.0/events.json?apikey=${apikey}&artist_name=${oneQuery}&location=clientip`
            // if (eventIndex.resultsPage.totalEntries === 0) {
            // return axios.get(
            // https://api.songkick.com/api/3.0/artists/{artist_id}/similar_artists.json?apikey={your_api_key}
            // )}
          );
        });
        console.log(eventIndex);
        const tempArray = [];
        Promise.all(eventIndex).then(resultArray => {
          console.log("Big Array", resultArray);
          resultArray.forEach(oneResponse => {
            if (oneResponse.data.resultsPage.totalEntries > 0) {
              tempArray.push(oneResponse);
            }
          });
          console.log(tempArray);
          // console.log(
          //   "First JSON",
          //   resultArray[0].data.resultsPage.results.event[0].displayName
          // );
          this.setState({ concertArray: tempArray });
        });
      })
      .catch(err => alert("woops"));
  }

  render() {
    const { topArtists, concertArray } = this.state;
    return (
      <section>
        <p>Connected</p>
        <h2>Bonjour {this.props.currentUser.fullName}</h2>
        <img src={this.props.currentUser.image} alt="alex" />
        <button onClick={event => this.userTopTracks(event)}>
          Get your top artists
        </button>

        <ul>
          {topArtists.map(oneTopArtist => {
            return (
              <li key={oneTopArtist.id}>
                <h3>Artist: {oneTopArtist.name}</h3>
                <img src={oneTopArtist.images[1].url} alt="artist" />
              </li>
            );
          })}
        </ul>
        <ul>
          {concertArray.map(oneConcert => {
            return (
              <li>
                <span>
                  {oneConcert.data.resultsPage.results.event.map(oneEvent => {
                    return (
                      <div>
                        <h4 key={oneEvent.id}>{oneEvent.displayName}</h4>
                        <h5>{oneEvent.type}</h5>
                      </div>
                    );
                  })}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default Connected;
