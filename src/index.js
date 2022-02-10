import React from 'react'
import ReactDOM from 'react-dom'
import { Spin, Alert } from 'antd'
import debounce from 'lodash.debounce'
import Item from 'antd/lib/list/Item'
import Header from './movies/header'
import SearchInput from './searchInput'
import ThemoviedbAPI from './services/api'
import Movies from './movies'
import Paginate from './pagination'
import 'antd/dist/antd.css'
import GenresContext from './genresContext'


class App extends React.Component {
  apiService = new ThemoviedbAPI()

  state = {
    label: '',
    filmsList: [],
    loading: false,
    error: '',
    pageNumber: 1,
    totalPages: 0,
    searhFilter: 'rated',
    ratedFilms: [],
    genres:[]
  }

    componentDidMount() {
    // this.updateRated()
          this.genreList()
          this.rateMenuSelection()

  }

  

  componentDidUpdate(prevProps, prevState) {
    const { ratedFilms, searhFilter } = this.state
    if (ratedFilms !== prevState.ratedFilms) {
      const arr = ratedFilms
      // console.log(arr);
      arr.forEach((element) => {
        localStorage.setItem(element.filmId, element.filmRate)
      })
      
      
          }
    if (searhFilter!==prevState.searhFilter){
            this.rateMenuSelection()
          }
// console.log(this.state);
  }

  
  genreList =()=>{
   const arr =  this.apiService.getGenres()
   console.log(arr);
    this.setState({
      genres:arr
    })
  } 
  
  onLabelChange = (e) => {
    this.setState(
      {
        value: e.target.value,
        loading: true,
      },
      debounce(() => this.addSearchValue(this.state.value), 700)
    )
  }

  onchangeFilter = (e) => {
    this.setState({
      searhFilter: e.target.value,
    })
    // console.log(this.state)
  }


  addSearchValue = (searchValue='') => {
    this.setState(
      {
        value: searchValue,
        pageNumber: 1,
        error: '',
      },
      () => this.updateFilms(this.state.value, this.state.pageNumber)
    )
  }

  updateFilms = (searchList, pageNumber = 1) => {
    this.apiService
      .getResourse(searchList, pageNumber)
      .then((res) => {
        this.setState({
          filmsList: [...res.results],
          loading: false,
          totalPages: res.total_pages,
        })
        // console.log(this.state)
      })

      .catch(this.onError)
  }

  warningMessage = (er) => {
    switch (er) {
      case '422':
        return <Alert message="Enter text to search" type="warning" closable />
      case 'not found':
        if (this.state.filmsList.length!==0){
          return null
         }
         return <Alert 
          message="Films not found" 
          type="warning" closable />
      case 'Failed to fetch':
        return (
          <Alert
            message="Сheck your network connection"
            type="warning"
            closable
          />
        )

      default:
        return null
    }
  }

  onchangePagination = (page) => {
    this.setState(
      {
        pageNumber: page,
      },
      () => this.updateFilms(this.state.value, this.state.pageNumber)
    )
  }

  showTotal = (total) => `Total ${total} pages`

  onchangeRate = (filmRate, filmId) => {
    this.setState(({ ratedFilms }) => {
      const newRatedFilm = { filmId, filmRate }
      const newArr = [...ratedFilms, newRatedFilm]
      return {
        ratedFilms: newArr,
      }
    })
    // console.log(this.state);
  }

  onError = (err) => {
    this.setState({
      filmsList: [],
      error: err.message,
      loading: false,
    })
    // console.log(this.state)
  }

  onLabelChange = (e) => {
    this.setState(
      {
        value: e.target.value,
        loading: true,
      },
      debounce(() => this.addSearchValue(this.state.value), 700)
    )
  }

  rateMenuSelection =()=>{
    if (this.state.searhFilter === 'rated') {
      console.log(this.state);
     this.updateRated()
    }
    if (this.state.searhFilter === 'search') {
      this.addSearchValue(this.state.value)
  }
  }

  async updateRated() {
    const keys = Object.keys(localStorage)
    const arrofRatedMovies = []
    for (const key of keys) {
      arrofRatedMovies.push(this.apiService.getById(key))
      // console.log(arrofRatedMovies)
    }
    this.setState({
      filmsList: await Promise.all(arrofRatedMovies),
      error:''
    })
  }



  render() {
    const { filmsList, loading, error, pageNumber, totalPages, searhFilter, value, genres} =
      this.state
    const spinner = loading ? <Spin size="large" className="spinner" /> : null
    const searchBar = () => {
      if (searhFilter === 'rated') {
        return null
      }
      if (searhFilter === 'search') {
        return (
          <SearchInput
            onLabelChange={this.onLabelChange}
            addSearchValue={this.addSearchValue}
            loadingFunc={this.loadingFunc}
            pageNumber={pageNumber}
            value = {value}
          />
        )
      }
      return null
    }

    const paginationOnRate =()=> {
      if (searhFilter === 'rated') {
        return null
      }
         return (
          <Paginate
          pageNumber={pageNumber}
          onchangePagination={this.onchangePagination}
          totalPages={totalPages}
          showTotal={this.showTotal}
          error={error}
          filmsList={filmsList}
        />
        )
    }

    return (
      <main>
        <Header
          onchangeFilter={this.onchangeFilter}
          searhFilter={searhFilter}
        />
        {searchBar()}
        <GenresContext.Provider value={genres}> 
          <Movies filmsList={filmsList} onchangeRate={this.onchangeRate} />
          </GenresContext.Provider>
       
        {spinner}
        {this.warningMessage(error)}
       {paginationOnRate()}
      </main>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
