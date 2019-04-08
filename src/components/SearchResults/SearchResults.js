import React from 'react';

import {TrackList} from '../TrackList/TrackList';

export class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(id) {
    this.props.add(id, '+');
  }

  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList type="results" tracks={this.props.tracks} updateList={this.handleUpdate} />
      </div>
    );
  }
}
