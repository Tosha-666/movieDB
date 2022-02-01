import React from 'react'
import ReactDOM from 'react-dom'
import { Spin, Alert } from 'antd'
import debounce from 'lodash.debounce'
import Header from './movies/header'
import SearchInput from './searchInput'
import ThemoviedbAPI from './services/api'
import Movies from './movies'
import Paginate from './pagination'
import 'antd/dist/antd.css'

class App extends React.Component {
  apiService = new ThemoviedbAPI()

  state = {
    label:'',
    filmsList: [],
    loading: false,
    error: '',
    pageNumber:1,
    totalPages:0,
    searhFilter:''
  }

  onError = (err) => {
    this.setState({
      filmsList: [],
      error: err.message,
      loading: false,
    })
    console.log(this.state)
  }

  onLabelChange = (e) => {
    this.setState(
      {
        value: e.target.value,
        loading:true
      },
      debounce(() => this.addSearchValue(this.state.value), 700)
    )

  }

  onchangeFilter = (e)=>{
    this.setState({
      searhFilter:e.target.value
    })
    // console.log(this.state);
  }
  
  addSearchValue = (searchValue)=>{
    this.setState({
      value:searchValue,
      pageNumber:1,
      error:''
    },(()=> this.updateFilms(this.state.value, this.state.pageNumber)))

  }

  updateFilms = (searchList, pageNumber=1) => {
    this.apiService
      .getResourse(searchList, pageNumber)
      .then((res) => {
        this.setState({
          filmsList: [...res.results],
          loading: false,
          totalPages:res.total_pages
        })
        // console.log(this.state)
      })

      .catch(this.onError)
  }

  // loadingFunc = (value) => {
  //   if (value) {
  //     this.setState({
  //       loading: true,
  //     })
  //   }
  //   // console.log(this.state)
  //   // console.log(value);
  // }

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
  
      onchangePagination=(page)=>{
      this.setState({
        pageNumber:page
      }, 
      (()=> this.updateFilms(this.state.value, this.state.pageNumber)))
         }

      showTotal =(total)=>`Total ${total} pages`

  render() {
    const { filmsList, loading, error, pageNumber, totalPages } = this.state
    const spinner = loading ? <Spin size="large" className="spinner" /> : null


    return (
      
      <main>
        <Header 
        onchangeFilter = {this.onchangeFilter}/>
        <SearchInput
          onLabelChange = {this.onLabelChange}
          addSearchValue = {this.addSearchValue}
          loadingFunc={this.loadingFunc}
          pageNumber={pageNumber}
        />
        <Movies filmsList={filmsList} />
        {spinner}
        {this.warningMessage(error)}
        <Paginate
         pageNumber={pageNumber}
         onchangePagination = {this.onchangePagination}
         totalPages={totalPages} 
         showTotal={this.showTotal}
         error = {error}
         filmsList = {filmsList}
        />

      </main>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
