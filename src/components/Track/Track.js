import React from 'react';

export class Track extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const track = this.props.track;
    this.props.getId(track.id);
    e.preventDefault();
  }

  render() {
    const track = this.props.track;

    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{track.name}</h3>
          <p>{track.artist} | {track.album}</p>
        </div>
        <a className="Track-action" onClick={this.handleClick}>
          {this.props.actionButton}
        </a>
      </div>
    );
  }
}
