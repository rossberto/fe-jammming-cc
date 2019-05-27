import React from 'react';

export class PlaylistOption extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    this.props.getTracks(this.props.value);
  }

  handleChange(e) {
    this.props.checkBox(e);
  }

  render() {
    return (
      <div onClick={this.handleClick} className="playlist-element">
        <input onChange={this.handleChange} type="checkbox" name={this.props.name} value={this.props.value} />{this.props.displayName}
      </div>
    );
  }
}
