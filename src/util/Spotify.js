const cors = 'https://cors-anywhere.herokuapp.com/';

export const Spotify = {
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
