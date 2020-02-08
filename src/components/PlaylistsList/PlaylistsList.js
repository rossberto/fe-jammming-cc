import React from 'react';

//import './PlaylistsList.css';

import {PlaylistOption} from '../PlaylistOption/PlaylistOption';

export class PlaylistsList extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.getPlaylists();
  }

  handleChange(e) {
    console.log(e);
    console.log("Hola");
  }

  render() {
    const playlists = this.props.userPlaylists;

    return (
      <div>
        <br />
        <div className="flex-playlists">
          {
            playlists.map(playlist => {
              return <PlaylistOption checkBox={this.props.checkBox} name={playlist.name} key={playlist.id} value={playlist.id} displayName={playlist.name} getTracks={this.props.getTracks} />;
            })
          }
        </div>
      </div>
    );
  }
}
