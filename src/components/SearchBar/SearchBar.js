import React from 'react';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleTermChange(e) {
    const newTerm = e.target.value;
    this.setState({term: newTerm});
  }

  handleClick() {
    // Check if authorized
    if (this.props.auth.auth) {
      // Authorized
      // Request a Spotify sarch
      const token = this.props.auth.token;
      this.props.searchSpotify(this.state.term, token);
    } else {
      // Non Authorized
      // Request Login
      this.props.login();
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.handleClick}>SEARCH</a>
      </div>
    );
  }
}
