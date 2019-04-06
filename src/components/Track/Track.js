import React from 'react';

export class Track extends React.Component {
  render() {
    const track = this.props.track;

    return (
      <div class="Track">
        <div class="Track-information">
          <h3>{track.name}</h3>
          <p>{track.artist} | {track.album}</p>
        </div>
        <a class="Track-action">{this.props.actionButton}</a>
      </div>
    );
  }
}
