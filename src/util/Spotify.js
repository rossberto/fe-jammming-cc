const cors = 'https://cors-anywhere.herokuapp.com/';
const clientId = '93051b381baf4825ae58bc059d5feec1';

const scope = 'user-read-private user-read-email';
const redirectUri = 'http://localhost:3000/';

export const Spotify = {
  auth() {
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + clientId;
    url += '&scope=' + scope;
    url += '&redirect_uri=' + redirectUri;
    //url += '&state=' + encodeURIComponent(state);
    window.location = url;
  },

  search(term, token) {
    const searchUrl = 'https://api.spotify.com/v1/search';
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
          artist: item.artists[0].name
        };
      });
    });
  }
}
