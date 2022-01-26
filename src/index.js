import React from 'react'
import ReactDOM from 'react-dom'
import { Spin } from 'antd';
import SearchInput from './searchInput';
import ThemoviedbAPI from './services/api';
import Movies from './movies';
import 'antd/dist/antd.css';

class App extends React.Component{
   apiService = new ThemoviedbAPI()

  state = {
    filmsList:[],
    loading:true
  }


 updateFilms=(searchList)=>{
   this.apiService.getResourse(searchList).then((res) =>{
   this.setState({
   filmsList:[...res.results]
   
  })   
  console.log(this.state)
 })
 }
 
 loadingFunc =(value)=>{
   if (value){
     this.setState({
        loading:false
      })}
      console.log(this.state)
      console.log(value);
}

render() {
  const {filmsList} = this.state 
  return(
    <div>
    <SearchInput  updateFilms={this.updateFilms}
                  loadingFunc = {this.loadingFunc}/>
    <Movies filmsList = {filmsList}/>
    {/* <Spin size="large" /> */}
    </div>
 
    


  )

}
  
}

ReactDOM.render(<App />, document.getElementById('root')
);


