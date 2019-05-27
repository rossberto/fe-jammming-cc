import React from 'react';

import './PlaylistsList.css';

import {PlaylistOption} from '../PlaylistOption/PlaylistOption';
import {Spotify} from '../../util/Spotify';

const playlistsArr = [
  {name: 'Playlist 1', id: '2YVEnjkWE38aN1nCUABzld'},
  {name: 'Playlist 2', id: '2YasdjkWE38aN1nCUABzld'},
  {name: 'Playlist 3', id: '2YVEnertE38aN1nCUABzld'},
  {name: 'Playlist 4', id: '2YVEnjkWE567N1nCUABzld'},
];

export class PlaylistsList extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.getPlaylists();
  }

  render() {
    const playlists = this.props.userPlaylists;

    return (
      <div>
        <div className="flex-playlists">
          {
            playlists.map(playlist => {
              return <PlaylistOption name="playlists" key={playlist.id} value={playlist.id} displayName={playlist.name} getTracks={this.props.getTracks} />;
            })
          }
        </div>
      </div>
    );
  }
}
