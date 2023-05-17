const api = {
  apiKey: '4451d1dc17f8bd635e7238c0ed4b389e',
  token:
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDUxZDFkYzE3ZjhiZDYzNWU3MjM4YzBlZDRiMzg5ZSIsInN1YiI6IjYyNDlmMWFlMDVmOWNmMDA5ZTkzODc3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uTD1HjR1k5aKOqEhTup92fZIZGX6Ypj2VzVz4vv__y4',

  baseUrl: 'https://api.themoviedb.org',
  guestSessionId: '',

  async getMovies(keyWord = 'Return', page = 1) {
    const resp = await fetch(
      `${this.baseUrl}/3/search/movie?query=${keyWord}&include_adult=true&page=${page}&include_adult=false`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    );

    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(`${data.status_message}`);
    }
    return data;
  },

  async getRatedMovies(page = 1) {
    const resp = await fetch(
      `${this.baseUrl}/3/guest_session/${this.guestSessionId}/rated/movies?api_key=${this.apiKey}&page=${page}&sort_by=created_at.desc`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      }
    );

    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(`${data.status_message}`);
    }
    return data;
  },

  async putRateMovie(id, value) {
    const resp = await fetch(
      `${this.baseUrl}/3/movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${this.guestSessionId}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ value }),
      }
    );

    const data = await resp.json();

    if (!data.success) {
      throw new Error(`${data.status_message}`);
    }

    return data;
  },

  async deleteRateMovie(id) {
    const resp = await fetch(
      `${this.baseUrl}/3/movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${this.guestSessionId}`,
      {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    );

    const data = await resp.json();

    if (!data.success) {
      throw new Error(`${data.status_message}`);
    }

    return data;
  },

  async openGuestSession() {
    if (localStorage.getItem('guestSessionId')) {
      this.guestSessionId = localStorage.getItem('guestSessionId');
      return;
    }

    const resp = await fetch(`${this.baseUrl}/3/authentication/guest_session/new?api_key=${this.apiKey}`, {
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
    this.guestSessionId = data.guest_session_id;
    localStorage.setItem('guestSessionId', data.guest_session_id);
  },

  async getGenres() {
    const resp = await fetch(`${this.baseUrl}/3/genre/movie/list?api_key=${this.apiKey}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
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
