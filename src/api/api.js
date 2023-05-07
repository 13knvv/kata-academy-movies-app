const api = {
  token:
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDUxZDFkYzE3ZjhiZDYzNWU3MjM4YzBlZDRiMzg5ZSIsInN1YiI6IjYyNDlmMWFlMDVmOWNmMDA5ZTkzODc3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uTD1HjR1k5aKOqEhTup92fZIZGX6Ypj2VzVz4vv__y4',

  baseUrl: 'https://api.themoviedb.org',

  async getMovies(keyWord = 'return', page = 1) {
    const resp = await fetch(`${this.baseUrl}/3/search/movie?query=${keyWord}&include_adult=true&page=${page}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    });

    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(`${data.status_message}`);
    }
    return data;
  },
};

export default api;
