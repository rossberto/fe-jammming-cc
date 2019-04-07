import React from 'react';

import {TrackList} from '../TrackList/TrackList';

export class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdateList = this.handleUpdateList.bind(this);
  }

  handleUpdateList(id) {
    this.props.remove(id);
  }

  render() {
    return (
      <div className="Playlist">
        <input value='New Playlist' />
        <TrackList type="playlist" tracks={this.props.tracks} updateList={this.handleUpdateList} />
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
