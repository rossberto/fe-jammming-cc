import React from 'react';

//import {Spotify} from '../../util/Spotify';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: false,
      term: ''
    }

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleTermChange(e) {
    const newTerm = e.target.value;
    this.setState({term: newTerm});
  }

  getToken(hash) {
    const token = hash.split('&')[0].slice(14);
    console.log('El token en getToken es ' + token);
    return token;
  }

  handleClick() {
    if (this.props.hash.length > 1) {
      console.log('Searching in Spotify with term: ' + this.state.term);
      const token = this.getToken(this.props.hash);
      //Spotify.search(this.state.term, token);
      this.props.searchSpotify(this.state.term, token);
    } else {
      // Request authorization
      //Spotify.authorize();
      this.setState({authorized: true});
      window.open('http://localhost:8888/', '_top');
    }
    /*
    if (this.state.authorized === true) {
      console.log('Searching in Spotify with term: ' + this.state.term);
      const token = this.getToken(this.props.hash);
      Spotify.search(this.state.term, token);
    } else {
      // Request authorization
      //Spotify.authorize();
      this.setState({authorized: true});
      window.open('http://localhost:8888/', '_top');
    }
    */
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song Title" />
        <a onClick={this.handleClick}>SEARCH {this.state.authorized ? 1 : 0}</a>
      </div>
    );
  }
}
