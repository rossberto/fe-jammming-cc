import React from 'react';

import {TrackList} from '../TrackList/TrackList';

const song1 = {
  name: 'Fuerte',
  artist: 'Britany Spiars',
  album: 'Chin! lo hice de nuevo'
}

const song2 = {
  name: 'Muy emocional',
  artist: 'Witny Jiuston',
  album: 'Witny'
}

const song3 = {
  name: 'Peor es nada',
  artist: 'Witny Jiuston',
  album: 'Mi amor es tu amor'
}

const tracks = [song1, song2, song3];

export class Playlist extends React.Component {
  render() {
    return (
      <div class="Playlist">
        <input value='New Playlist' />
        <TrackList type="playlist" tracks={tracks} />
        <a class="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
