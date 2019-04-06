import React from 'react';

import {TrackList} from '../TrackList/TrackList';

const song1 = {
  name: 'Bailarin',
  artist: 'Eltonyon',
  album: 'Loco por el agua'
}

const song2 = {
  name: 'Bailarin',
  artist: 'Tim Macgro',
  album: 'Historia de amor'
}

const song3 = {
  name: 'Bailarin',
  artist: 'Rockea nena',
  album: 'Lulabis'
}

const tracks = [song1, song2, song3];

export class SearchResults extends React.Component {
  render() {
    return (
      <div class="SearchResults">
        <h2>Results</h2>
        <TrackList type="results" tracks={tracks} />
      </div>
    );
  }
}
