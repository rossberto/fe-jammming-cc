import React, { Component } from 'react';
import './App.css';

import {SearchBar} from './components/SearchBar/SearchBar';
import {AppPlaylist} from './components/AppPlaylist/AppPlaylist';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <AppPlaylist />
        </div>
      </div>
    );
  }
}

export default App;
