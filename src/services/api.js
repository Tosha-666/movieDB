export default class ThemoviedbAPI {
  baseURL =
    'https://api.themoviedb.org/3/search/movie?api_key=98450458092ec1ceaf6809681f572de7&query='

  async getResourse(searching, pageNumber) {
    const res = await fetch(`${this.baseURL}&query=${searching}&page=${pageNumber}`)
    if (!res.ok) {
      console.log(res)
      throw new Error(res.status)
    }
    const body = await res.json()
    if (body.total_results === 0) {
      throw new Error('not found')
    } else {
      return body
    }
  }

  //   lookingForFilms(){
  //       return this.getResourse('finally')

  //   }

  //  listOfFilms =()=>{
  //   this.lookingForFilms().then((res)=>console.log(res.results ))
  //    }
}
// const testSearch = new ThemoviedbAPI()
// testSearch.getResourse('finally').then((body)=>console.log(body.results))
