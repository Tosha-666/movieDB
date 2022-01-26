import React from 'react'
import ReactDOM from 'react-dom'
import SearchInput from './searchInput';
import ThemoviedbAPI from './services/api';
import Movies from './movies';


class App extends React.Component{
   apiService = new ThemoviedbAPI()

  state = {
    filmsList:[]
  }


 updateFilms=(searchList)=>{
   this.apiService.getResourse(searchList).then((res) =>{
   this.setState({
   filmsList:[...res.results]
   
  })   
  console.log(this.state.filmsList)
 })
 }
 


render() {
  return(
    <div>
    <SearchInput updateFilms={this.updateFilms}/>
    <Movies filmsList = {this.state.filmsList}/>
    </div>
 

  )

}
  
}

ReactDOM.render(<App />, document.getElementById('root')
);


