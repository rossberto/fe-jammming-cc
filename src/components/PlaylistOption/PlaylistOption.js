import React from 'react';

export class PlaylistOption extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.getTracks(this.props.value);
  }

  render() {
    return (
      <div onClick={this.handleClick} className="playlist-element">
        <input type="checkbox" name={this.props.name} value={this.props.value} />{this.props.displayName}
      </div>
    );
  }
}
