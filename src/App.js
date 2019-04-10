import React, { Component } from 'react';
import './App.css';

import {SearchBar} from './components/SearchBar/SearchBar';
import {AppPlaylist} from './components/AppPlaylist/AppPlaylist';

import {Spotify} from './util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      playlist: [],
      auth: false,
      token: '',
      userId: ''
    }

    this.searchSpotify = this.searchSpotify.bind(this);
    this.edit = this.edit.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  searchSpotify(term, token) {
    Spotify.search(term, token).then(tracks => {
      this.setState({results: tracks});
    })
  }

  removeFromPlaylist(id) {
    const currentTracks = this.state.playlist;

    const editedTracks = currentTracks.filter(track => track.id !== id);
    this.setState({ playlist: editedTracks});
  }

  addToPlaylist(id) {
    const playlistTracks = this.state.playlist;
    const trackToAdd = this.state.results.find( element => {
      return element.id === id;
    });

    playlistTracks.push(trackToAdd);
    this.setState({ playlist: playlistTracks});
  }

  edit(id, type) {
    if (type === '+') {
      this.addToPlaylist(id);
    } else if (type === '-') {
      this.removeFromPlaylist(id);
    } else {
      return;
    }
  }

  handleLogin() {
    Spotify.auth();
  }

  handleSave(name) {
    Spotify.getUserId(this.state.token).then(userId => {
      Spotify.createPlaylist(name, this.state.token, userId).then(playlistId => {
        Spotify.addToPlaylist(playlistId, this.state.token, this.state.playlist).then(
          this.setState({playlist: []})
        );
      });
    });
  }

  componentDidMount() {
    if (window.location.hash) {
      const hash = window.location.hash;
      const token = hash.split('&')[0].slice(14);

      this.setState({
        auth: true,
        token: token
      });
    }
  }

  render() {
    const credentials = {
      auth: this.state.auth,
      token: this.state.token
    }

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar auth={credentials} login={this.handleLogin} searchSpotify={this.searchSpotify} />
          <AppPlaylist results={this.state.results} playlist={this.state.playlist} edit={this.edit} save={this.handleSave} />
        </div>
      </div>
    );
  }
}

export default App;
