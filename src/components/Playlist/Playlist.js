import React from 'react';

import {TrackList} from '../TrackList/TrackList';

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: ''
    }

    this.handleUpdateList = this.handleUpdateList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleUpdateList(id) {
    this.props.remove(id, '-');
  }

  handleChange(e) {
    const listName = e.target.value;
    this.setState({
      playlistName: listName
    });
  }

  handleClick() {
    if (this.state.playlistName !== '') {
      this.props.save(this.state.playlistName);
    } else {
      alert('Playlist name should not be empty.');
    }
  }

  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleChange} placeholder='New Playlist' />
        <TrackList type="playlist" tracks={this.props.tracks} updateList={this.handleUpdateList} />
        <a onClick={this.handleClick} className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
