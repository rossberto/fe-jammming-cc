import React from 'react';

import {PlaylistsList} from '../PlaylistsList/PlaylistsList';

export class PlaylistsResults extends React.Component {
  render() {
    return (
      <div className="PlaylistsResults">
        <h2>Users's Playlists</h2>
        <a className="updateButton" onClick={this.props.refreshPlaylists}>UPDATE</a>
        <PlaylistsList userPlaylists={this.props.userPlaylists} getTracks={this.props.getTracks} checkBox={this.props.checkBox} />
      </div>
    );
  }
}
