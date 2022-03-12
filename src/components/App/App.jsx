import React from 'react'
import { Spin, Alert } from 'antd'
import debounce from 'lodash.debounce'
import {Main} from '../Main'
import ThemoviedbAPI from '../../api'
import Paginate from '../Paginate'
import 'antd/dist/antd.css'
import GenresContext from '../../genresContext'
import './App.scss'

export default class App extends React.Component {
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
    genres: [],
  }

  componentDidMount() {
    this.genreList()

  }

  componentDidUpdate(prevProps, prevState) {
    const { ratedFilms, searhFilter } = this.state
    if (ratedFilms !== prevState.ratedFilms) {
      const arr = ratedFilms
      arr.forEach((element) => {
        localStorage.setItem(element.filmId, element.filmRate)
      })
    }
    if (searhFilter !== prevState.searhFilter) {
      this.rateMenuSelection()
    }
  }

  genreList = async () => {
    const arr = await this.apiService.getGenres()
    this.setState(
      {
        genres: arr,
      },
      () => this.rateMenuSelection()
    )
  }

  onLabelChange = (e) => {
    this.setState(
      {
        label: e.target.value,
        loading: true,
      },
      debounce(() => this.addSearchValue(this.state.label), 700)
    )
  }

  onchangeFilter = (filter) => {
    this.setState({
      searhFilter: filter,
    })
  }

  addSearchValue = (searchValue = '') => {
    this.setState(
      {
        label: searchValue,
        pageNumber: 1,
        error: '',
      },
      () => this.updateFilms(this.state.label, this.state.pageNumber)
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
      })

      .catch(this.onError)
  }

  warningMessage = (er) => {
    switch (er) {
      case '422':
        return <Alert message="Enter text to search" type="warning" closable />
      case 'not found':
        if (this.state.filmsList.length !== 0) {
          return null
        }
        return <Alert message="Films not found" type="warning" closable />
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
      () => this.updateFilms(this.state.label, this.state.pageNumber)
    )
  }

  showTotal = (total) => `Total ${total} pages`

  onchangeRateFilm = (filmRate, film) => {
    const currFilm = { ...film, userRating: filmRate }

    localStorage.setItem(film.id, JSON.stringify(currFilm))
  }

  onError = (err) => {
    this.setState({
      filmsList: [],
      error: err.message,
      loading: false,
    })
    // console.log(this.state)
  }


  rateMenuSelection = () => {
    if (this.state.searhFilter === 'rated') {
      this.updateRated()
    }
    if (this.state.searhFilter === 'search') {
      this.addSearchValue(this.state.label)
    }
  }

  updateRated=()=> {
    const arrofRatedMovies = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const currentFilm = JSON.parse(localStorage.getItem(key))
      arrofRatedMovies.push(currentFilm)
    }

    this.setState({
      filmsList: arrofRatedMovies,
      error: '',
    })
  }

  render() {
    const {
      filmsList,
      loading,
      error,
      pageNumber,
      totalPages,
      searhFilter,
      label,
      genres,
    } = this.state

    const spinner = loading ? <Spin size="large" className="spinner" /> : null


    const paginationOnRate = () => {
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
        <GenresContext.Provider value={genres}>
        <Main
          onchangeFilter={this.onchangeFilter}
          searhFilter={searhFilter}
          filmsList={filmsList}
          onchangeRateFilm={this.onchangeRateFilm}
          onLabelChange={this.onLabelChange}
          label={label}
        />
        </GenresContext.Provider>
 
        {spinner}
        {this.warningMessage(error)}
        {paginationOnRate()}
      </main>
    )
  }
}
