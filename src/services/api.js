export default class ThemoviedbAPI {
    baseURL =
      'https://api.themoviedb.org/3/search/movie?api_key=98450458092ec1ceaf6809681f572de7&query='
  
    async getResourse(searching) {
      const res = await fetch(`${this.baseURL}+${searching}`)
      if (!res.ok) {
        throw new Error(`Could not fetch ${this.baseURL} recieved ${res.status}`)
      }
      const body = await res.json()
      return(body); 
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
  