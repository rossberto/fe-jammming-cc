const cors = 'https://cors-anywhere.herokuapp.com/';
const clientId = '93051b381baf4825ae58bc059d5feec1';

const scope = 'user-read-private user-read-email playlist-modify-public';
const redirectUri = 'http://localhost:3000/';

const authUrl = 'https://accounts.spotify.com/authorize';
const searchUrl = 'https://api.spotify.com/v1/search';
const playlistsUrl = 'https://api.spotify.com/v1/playlists';
const userUrl = 'https://api.spotify.com/v1/me';

export const Spotify = {
  auth() {
    let url = authUrl;
    url += '?response_type=token';
    url += '&client_id=' + clientId;
    url += '&scope=' + scope;
    url += '&redirect_uri=' + redirectUri;
    //url += '&state=' + encodeURIComponent(state);
    window.location = url;
  },

  search(term, token) {
    const headerToFetch = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const query = `?q=${term}&type=track`;
    const urlToFetch = searchUrl + query;

    return fetch(urlToFetch, headerToFetch).then(response => {
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse.tracks.items.map(item => {
        return {
          id: item.id,
          name: item.name,
          album: item.album.name,
          artist: item.artists[0].name,
          uri: item.uri
        };
      });
    });
  },

  getUserId(token) {
    let urlToFetch = userUrl;
    const headerToFetch = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    return fetch(urlToFetch, headerToFetch).then(response => {
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse.id;
    });
  },

  createPlaylist(name, token, userId) {
    const urlToFetch = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const bodyToFetch = JSON.stringify({
      'name': name
    });

    const headerToFetch = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: bodyToFetch
    };

    return fetch(urlToFetch, headerToFetch, bodyToFetch).then(response => {
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse.id;
    });
  },

  addToPlaylist(playlistId, token, playlist) {
    let urlToFetch = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    urlToFetch += '?uris='
    const tracks = playlist.map(track => {
      urlToFetch += `${track.uri},`;
    });

    const headerToFetch = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }

    return fetch(urlToFetch, headerToFetch).then(response => {
      if (response.ok) {
        alert('Playlist saved succesfuly!');
      }
    });
  },

  getPlaylists(token) {
    let urlToFetch = `https://api.spotify.com/v1/me/playlists`;

    const headerToFetch = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }

    return fetch(urlToFetch, headerToFetch).then(response => {
      //if (response.ok) {
        return response.json();
      //}
    }).then(jsonResponse => {
      return jsonResponse;
    })
  }
}
