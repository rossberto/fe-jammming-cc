import React from 'react';

import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

export class AppPlaylist extends React.Component {
  render() {
    return (
      <div className="App-playlist">
        <SearchResults tracks={this.props.results} add={this.props.edit}/>
        <Playlist tracks={this.props.playlist} remove={this.props.edit} />
      </div>
    );
  }
}
