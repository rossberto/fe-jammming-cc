import React from 'react';

import {Track} from '../Track/Track';

export class TrackList extends React.Component {
  getActionButton(type) {
    if (type === 'results') {
      return '+';
    } else if (type === 'playlist') {
      return '-';
    } else {
      return '';
    }
  }

  render() {
    const tracks = this.props.tracks;
    const type = this.props.type;

    return (
      <div class="TrackList">
        {tracks.map(track => {
          return <Track track={track} actionButton={this.getActionButton(type)} />;
        })}
      </div>
    );
  }
}
