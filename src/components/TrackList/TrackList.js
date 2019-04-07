import React from 'react';

import {Track} from '../Track/Track';

export class TrackList extends React.Component {
  constructor(props) {
    super(props);
    this.handleId = this.handleId.bind(this);
  }

  getActionButton(type) {
    if (type === 'results') {
      console.log(this.props.edition);
      return '+';
    } else if (type === 'playlist') {
      return '-';
    } else {
      return '';
    }
  }

  handleId(id) {
    this.props.updateList(id);
  }

  render() {
    const tracks = this.props.tracks;
    const type = this.props.type;

    return (
      <div className="TrackList">
        {tracks.map(track => {
          return <Track track={track} actionButton={this.getActionButton(type)} getId={this.handleId} />;
        })}
      </div>
    );
  }
}
