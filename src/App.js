import React, { Component } from 'react';
import './App.css';

import {SearchBar} from './components/SearchBar/SearchBar';
import {AppPlaylist} from './components/AppPlaylist/AppPlaylist';

import {Spotify} from './util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: '',
      results: [],
      playlist: []
    }

    this.searchSpotify = this.searchSpotify.bind(this);
    this.edit = this.edit.bind(this);
  }

  getHash() {
    return window.location.hash;
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

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar hash={this.getHash()} searchSpotify={this.searchSpotify} />
          <AppPlaylist results={this.state.results} playlist={this.state.playlist} edit={this.edit} />
        </div>
      </div>
    );
  }
}

export default App;
