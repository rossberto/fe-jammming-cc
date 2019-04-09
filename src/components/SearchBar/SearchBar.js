import React from 'react';

//import {Spotify} from '../../util/Spotify';

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
    if (this.props.auth.auth) {
      const token = this.props.auth.token;
      this.props.searchSpotify(this.state.term, token);
    } else {
      // Request authorization
      this.props.login();
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song Title" />
        <a onClick={this.handleClick}>SEARCH</a>
      </div>
    );
  }
}
