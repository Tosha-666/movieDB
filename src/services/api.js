export default class ThemoviedbAPI {
  baseURL =
    'https://api.themoviedb.org/3/search/movie?api_key=98450458092ec1ceaf6809681f572de7&query='

  baseURLforIdsearch = 'https://api.themoviedb.org/3/movie/'

  async getResourse(searching, pageNumber) {
    const res = await fetch(
      `${this.baseURL}&query=${searching}&page=${pageNumber}`
    )
    if (!res.ok) {
      // console.log(res)
      throw new Error(res.status)
    }
    const body = await res.json()
    if (body.total_results === 0) {
      throw new Error('not found')
    } else {
      // console.log(body)
      return body
    }
  }

  async getById(filmId) {
    const res = await fetch(
      `${this.baseURLforIdsearch}${filmId}?api_key=98450458092ec1ceaf6809681f572de7&language=en-US`
    )
    if (!res.ok) {
      // console.log(res)
      throw new Error(res.status)
    }
    const body = await res.json()
    // console.log(body)
    return body
  }

  async getGenres() {
    const res = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=98450458092ec1ceaf6809681f572de7&language=en-US'
    )
    if (!res.ok) {
      // console.log(res)
      throw new Error(res.status)
    }
    const body = await res.json()
    console.log(body)
    return body
  }
}
