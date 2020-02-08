import React from 'react';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRecommendation = this.handleRecommendation.bind(this);
  }

  handleTermChange(e) {
    const newTerm = e.target.value;
    this.setState({term: newTerm});
  }

  handleClick(e) {
    e.preventDefault();
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

  handleRecommendation(e) {
    e.preventDefault();
    const token = this.props.auth.token;

    this.props.recommend(token);
  }

  render() {
    return (
      <form onSubmit={this.handleClick} className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <div style={{display: "inline-block"}}>
          <a onClick={this.handleClick} style={{display: "inline-block", marginRight: "15px"}}>SEARCH</a>
          <a onClick={this.handleRecommendation} style={{display: "inline-block", marginLeft: "15px"}}>RECOMMEND</a>
        </div>
      </form>
    );
  }
}
