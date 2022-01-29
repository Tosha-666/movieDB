import React from 'react'
import ReactDOM from 'react-dom'
import { Spin, Alert, Pagination } from 'antd'
import SearchInput from './searchInput'
import ThemoviedbAPI from './services/api'
import Movies from './movies'
import 'antd/dist/antd.css'

class App extends React.Component {
  apiService = new ThemoviedbAPI()

  state = {
    label:'',
    filmsList: [],
    loading: false,
    error: ' ',
    pageNumber:1
  }

  onError = (err) => {
    this.setState({
      filmsList: [],
      error: err.message,
      loading: false,
    })
    console.log(this.state)
  }


  
  addSearchValue = (searchValue)=>{
    this.setState({
      value:searchValue
    },(()=> this.updateFilms(this.state.value, this.state.pageNumber)))
   
  }

  updateFilms = (searchList, pageNumber=1) => {
    this.apiService
      .getResourse(searchList, pageNumber)
      .then((res) => {
        this.setState({
          filmsList: [...res.results],
          loading: false,
        })
        // console.log(this.state)
      })

      .catch(this.onError)
  }

  loadingFunc = (value) => {
    if (value) {
      this.setState({
        loading: true,
      })
    }
    // console.log(this.state)
    // console.log(value);
  }

  warningMessage = (er) => {
      switch (er) {
        case '422':
          return  <Alert message="Enter text to search" type="warning" closable />
           case 'not found':
          return  <Alert message="Films not found" type="warning" closable />
          case 'Failed to fetch':
          return  <Alert message="Сheck your network connection" type="warning" closable />
          
        default:
          return null 
      }
    }

  
    // showTotal(total) {
    //   return `Total ${total} items`;
    // }

    onchangePagination=(page)=>{
      this.setState({
        pageNumber:page
      }, 
      (()=> this.updateFilms(this.state.value, this.state.pageNumber)))
         }

  showTotal =(total)=>`Total ${total} items`
      

  render() {
    const { filmsList, loading, error } = this.state
    const {pageNumber} = this.state
    const spinner = loading ? <Spin size="large" className="spinner" /> : null
    
    return (
      
      <div>
        <SearchInput
          addSearchValue = {this.addSearchValue}
          loadingFunc={this.loadingFunc}
          pageNumber={pageNumber}
        />
        <Movies filmsList={filmsList} />
        {spinner}
        {this.warningMessage(error)}
        <Pagination 
        onChange={this.onchangePagination}
        size='small'
        defaultCurrent={1} 
        total={10} 
        defaultPageSize = {1}
        showTotal={this.showTotal}
        />,
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
