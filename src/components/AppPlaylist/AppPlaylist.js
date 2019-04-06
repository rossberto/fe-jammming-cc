import React from 'react';

import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

export class AppPlaylist extends React.Component {
  render() {
    return (
      <div class="App-playlist">
        <SearchResults />
        <Playlist />
      </div>
    );
  }
}
