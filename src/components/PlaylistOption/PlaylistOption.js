import React from 'react';

export class PlaylistOption extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="playlist-element">
        <input type="checkbox" name={this.props.name} value={this.props.value} />{this.props.displayName}
      </div>
    );
  }
}
