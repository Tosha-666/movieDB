export default class ThemoviedbAPI {
  baseURL = 'https://api.themoviedb.org/'

  baseURLforIdsearch = 'https://api.themoviedb.org/3/movie/'

  apiKey = '98450458092ec1ceaf6809681f572de7'

  async getResourse(searching, pageNumber) {
    const res = await fetch(
      `${this.baseURL}3/search/movie?api_key=98450458092ec1ceaf6809681f572de7&query=&query=${searching}&page=${pageNumber}`
    )
    if (!res.ok) {
      // console.log(res)
      throw new Error(res.status)
    }
    const body = await res.json()
    if (body.total_results === 0) {
      throw new Error('not found')
    } else {
      return body
    }
  }

  async getGenres() {
    const res = await fetch(
      `${this.baseURL}3/genre/movie/list?api_key=98450458092ec1ceaf6809681f572de7&language=en-US`
    )
    if (!res.ok) {
      throw new Error(res.status)
    }
    const body = await res.json()

    return body
  }

  async getGuestSessionId() {
    const res = await fetch(
      `${this.baseURL}3/authentication/guest_session/new?api_key=${this.apiKey}`
    )
    if (!res.ok) {
      throw new Error(res.status)
    }
    const guestId = await res.json()
    console.log(guestId)
    return guestId
  }

  async getRatedMovies(guestSessionId) {
    const res = await fetch(
      `${this.baseURL}3/guest_session/${guestSessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`
    )
    if (!res.ok) {
      throw new Error(res.status)
    }
    const ratedMovies = await res.json()
    console.log(guestSessionId)
    console.log(ratedMovies)
    return ratedMovies
  }

  async setMovieRate(filmId, rating, guestId) {
    const res = await fetch(
      `${this.baseURL}3/movie/${filmId}/rating?api_key=${this.apiKey}&guest_session_id=${guestId}`,
      {
        method: 'POST',
        body: JSON.stringify(rating),
      }
    )
    if (!res.ok) {
      throw new Error(res.status)
    }
    return res
  }
}

// guest_session_id: "c3e1d53ab8acf7fac94313e968fe3a16"
