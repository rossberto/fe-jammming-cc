import React from 'react';

import {PlaylistsList} from '../PlaylistsList/PlaylistsList';

export class PlaylistsResults extends React.Component {
  render() {
    return (
      <div className="PlaylistsResults">
        <h2>Users's Playlists</h2>
        <PlaylistsList userPlaylists={this.props.userPlaylists} />
      </div>
    );
  }
}
