import React, { Component } from 'react';
import './App.css';

import {SearchBar} from './components/SearchBar/SearchBar';
import {SearchResults} from './components/SearchResults/SearchResults';
import {Playlist} from './components/Playlist/Playlist';
import {PlaylistsResults} from './components/PlaylistsResults/PlaylistsResults';

import {Spotify} from './util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      playlist: [],
      auth: false,
      token: '',
      userPlaylists: []
    }

    this.searchSpotify = this.searchSpotify.bind(this);
    this.edit = this.edit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
    this.getPlaylistTracks = this.getPlaylistTracks.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.recommenderSpotify = this.recommenderSpotify.bind(this);
  }

  searchSpotify(term, token) {
    Spotify.search(term, token).then(tracks => {
      window.location.hash = '';
      this.setState({results: tracks});
    }).then(
      Spotify.getPlaylists(this.state.token).then(jsonResponse => {
        this.setState({userPlaylists: jsonResponse.items});
      })
    );
  }

  recommenderSpotify(token) {
    Spotify.getRecommendedIds(token).then(ids => {
      Spotify.getTracks(token, ids).then(tracks => {
        this.setState({playlist: tracks});
      });
    });
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
    Spotify.getPlaylists(this.state.token).then(jsonResponse => {
      const userPlaylists = jsonResponse.items;
      const found = userPlaylists.find(element => {
        return element.name === name;
      });

      if (found === undefined) {
        Spotify.getUserId(this.state.token).then(userId => {
          Spotify.createPlaylist(name, this.state.token, userId).then(playlistId => {
            Spotify.addToPlaylist(this.state.token, playlistId, this.state.playlist).then(
              this.setState({playlist: []})
            ).then(response => {
              if (response.ok) {
                alert('Playlist saved succesfuly!');
              } else {
                alert('Something went wrong!');
              }
            });
          });
        });
      } else {
        Spotify.replacePlaylistTracks(this.state.token, found.id, this.state.playlist).then(response => {
          if (response.ok) {
            alert('Playlist updated succesfuly!');
            this.setState({playlist: []});
          } else {
            alert('Something went wrong!');
          }

        });
      }
    });
  }

  getPlaylists() {
    if (this.state.token !== '') {
      Spotify.getPlaylists(this.state.token).then(jsonResponse => {
        this.setState({userPlaylists: jsonResponse.items});
      })
    } else {
      Spotify.auth();
    }
  }

  getPlaylistTracks(id) {
    Spotify.getPlaylistTracks(this.state.token, id).then(tracks => {
      this.setState({results: tracks})
    });
  }

  handleCheckBox(e) {
    let playlistId = e.target.value;
    let playlist = this.state.playlist;

    if (e.target.checked === true) {
      const tracksToAdd = [];
      Spotify.getPlaylistTracks(this.state.token, playlistId).then(tracks => {
        tracks.forEach(track => {
          let already = playlist.find(element => {
            return element.id === track.id;
          });
          if (already === undefined) {
            tracksToAdd.push(track)
          }
        });
        playlist = playlist.concat(tracksToAdd);
        this.setState({playlist: playlist});
      });
    } else {
      Spotify.getPlaylistTracks(this.state.token, playlistId).then(tracks => {
        tracks.forEach(track => {
          const trackIndex = playlist.findIndex(element => {
            return element.id === track.id;
          });

          playlist.splice(trackIndex, 1);
        });

        this.setState({playlist: playlist});
      });
    }
  }

  componentWillMount() {
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
          <SearchBar auth={credentials} login={this.handleLogin} searchSpotify={this.searchSpotify} recommend={this.recommenderSpotify} />
          <div className="App-playlist">
            <PlaylistsResults refreshPlaylists={this.getPlaylists} userPlaylists={this.state.userPlaylists} getTracks={this.getPlaylistTracks} checkBox={this.handleCheckBox} />
            <SearchResults tracks={this.state.results} add={this.edit} />
            <Playlist tracks={this.state.playlist} remove={this.edit} save={this.handleSave} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
