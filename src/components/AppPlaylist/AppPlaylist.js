import React from 'react';

import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

const song1 = {
  id: '1',
  name: 'Bailarin',
  artist: 'Eltonyon',
  album: 'Loco por el agua'
}

const song2 = {
  id: '2',
  name: 'Bailarin',
  artist: 'Tim Macgro',
  album: 'Historia de amor'
}

const song3 = {
  id: '3',
  name: 'Bailarin',
  artist: 'Rockea nena',
  album: 'Lulabis'
}

const searchTracks = [song1, song2, song3];

const song4 = {
  id: '4',
  name: 'Fuerte',
  artist: 'Britany Spiars',
  album: 'Chin! lo hice de nuevo'
}

const song5 = {
  id: '5',
  name: 'Muy emocional',
  artist: 'Witny Jiuston',
  album: 'Witny'
}

const song6 = {
  id: '6',
  name: 'Peor es nada',
  artist: 'Witny Jiuston',
  album: 'Mi amor es tu amor'
}

const playlistTracks = [song4, song5, song6];

export class AppPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: searchTracks,
      playlist: playlistTracks
    }

    this.removeFromPlaylist = this.removeFromPlaylist.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
  }

  removeFromPlaylist(id) {
    const currentTracks = this.state.playlist;

    const editedTracks = currentTracks.filter(track => track.id !== id);
    this.setState({ playlist: editedTracks});
  }

  addToPlaylist(id) {
    const playlistTracks = this.state.playlist;
    //const index = this.state.results.find();
    const trackToAdd = this.state.results.find( element => {
      return element.id === id;
    });

    playlistTracks.push(trackToAdd);
    this.setState({ playlist: playlistTracks});
  }

  render() {
    return (
      <div className="App-playlist">
        <SearchResults tracks={this.state.results} add={this.addToPlaylist}/>
        <Playlist tracks={this.state.playlist} remove={this.removeFromPlaylist} />
      </div>
    );
  }
}
