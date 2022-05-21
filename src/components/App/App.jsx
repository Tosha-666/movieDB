import React, { useState, useEffect, useCallback, useMemo } from 'react'
import debounce from 'lodash.debounce'
import cookie from 'cookie_js'
import { Spin, Alert } from 'antd'
import { Paginate } from '../PaginationComponent'
import { Main } from '../Main'
import ThemoviedbAPI from '../../api'
import 'antd/dist/antd.min.css'
import GenresContext from '../../genresContext'
import './App.scss'

function App() {
  const apiService = new ThemoviedbAPI()

  const [label, setLabel] = useState('')
  const [filmsList, setFilmsList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searhFilter, setSearhFilter] = useState('rated')
  const [ratedFilms, setRatedFilms] = useState([])
  const [genres, setGenres] = useState([])
  const [guestId, setGuestId] = useState('')

  const updateRated = () => {
    const arrofRatedMovies = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const currentFilm = JSON.parse(localStorage.getItem(key))
      arrofRatedMovies.push(currentFilm)
    }
    setRatedFilms(arrofRatedMovies)
    setError('')
  }

  const onError = (err) => {
    setFilmsList([])
    setError(err.message)
    setLoading(false)
    // console.log(this.state)
  }

  const updateFilms = (searchList, numberOfPage = 1) => {
    apiService
      .getResourse(searchList, numberOfPage)
      .then((res) => {
        setFilmsList([...res.results])
        setLoading(false)
        setTotalPages(res.total_pages)
      })

      .catch(onError)
  }

  const setIdToCookie = (dataGuest) => {
    cookie.set('guest_session_id', dataGuest.guest_session_id)
    apiService.getRatedMovies(dataGuest.guest_session_id)
  }

  useEffect(() => {
    if (!cookie.get('guest_session_id')) {
      console.log(cookie.get('guest_session_id'))
      apiService.getGuestSessionId().then((res) => setIdToCookie(res))
    } else {
      console.log(cookie.get('guest_session_id'))
      apiService.getRatedMovies(cookie.get('guest_session_id'))
    }
  }, [])

  const addSearchValue = (searchValue = '') => {
    console.log(searchValue)
    // setLabel(searchValue)
    // setPageNumber(1)
    setError('')
    updateFilms(label, pageNumber)
  }

  const rateMenuSelection = () => {
    if (searhFilter === 'rated') {
      updateRated()
    }
    if (searhFilter === 'search') {
      addSearchValue(label)
    }
  }

  const genreList = async () => {
    setGenres(await apiService.getGenres())
    rateMenuSelection()
  }

  useEffect(() => {
    genreList()
  }, [])

  // const debouncedSearch = useCallback(
  //   () =>
  //     debounce((text) => {
  //       addSearchValue(text)
  //     }, 1000),
  //   [addSearchValue]
  // )

  // const delayedQuery = useCallback(
  //   debounce((q: string) => sendQuery(q), 500), // (*)
  //   []
  //   );

  useEffect(() => {
    // console.log(label)
    // addSearchValue(label)
    // debounce(() => addSearchValue(label), 7000)
    addSearchValue(label)
  }, [label])

  useEffect(() => {
    // const { ratedFilms, searhFilter } = this.state
    const arr = ratedFilms
    arr.forEach((element) => {
      if (element !== undefined) {
        localStorage.setItem(element.filmId, element.filmRate)
      }
    })
  }, [])

  // componentDidUpdate(prevProps, prevState) {
  //   const { ratedFilms, searhFilter } = this.state
  //   if (ratedFilms !== prevState.ratedFilms) {
  //     const arr = ratedFilms
  //     arr.forEach((element) => {
  //       localStorage.setItem(element.filmId, element.filmRate)
  //     })
  //   }
  //   if (searhFilter !== prevState.searhFilter) {
  //     this.rateMenuSelection()
  //   }
  // }

  const onLabelChange = (e) => {
    setLabel(e.target.value)
    setLoading(false)
  }

  const onchangeFilter = (filter) => {
    setSearhFilter(filter)
  }

  const warningMessage = (er) => {
    switch (er) {
      case '422':
        return <Alert message="Enter text to search" type="warning" closable />
      case 'not found':
        if (filmsList.length !== 0) {
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

  const onchangePagination = (page) => {
    setPageNumber(page)
    updateFilms(label, pageNumber)
  }

  const showTotal = (total) => `Total ${total} pages`

  const onchangeRateFilm = (filmRate, film) => {
    const currFilm = { ...film, userRating: filmRate }

    localStorage.setItem(film.id, JSON.stringify(currFilm))
  }

  // const {
  //   filmsList,
  //   loading,
  //   error,
  //   pageNumber,
  //   totalPages,
  //   searhFilter,
  //   label,
  //   genres,
  // } = this.state

  const spinner = loading ? <Spin size="large" className="spinner" /> : null

  const paginationOnRate = () => {
    if (searhFilter === 'rated') {
      return null
    }
    return (
      <Paginate
        pageNumber={pageNumber}
        onchangePagination={() => onchangePagination()}
        totalPages={totalPages}
        showTotal={() => showTotal()}
        error={error}
        filmsList={filmsList}
      />
    )
  }

  return (
    <main>
      <GenresContext.Provider value={genres}>
        <Main
          onchangeFilter={onchangeFilter}
          searhFilter={searhFilter}
          filmsList={filmsList}
          ratedFilms={ratedFilms}
          onchangeRateFilm={onchangeRateFilm}
          onLabelChange={onLabelChange}
          label={label}
        />
      </GenresContext.Provider>

      {spinner}
      {warningMessage(error)}
      {paginationOnRate()}
    </main>
  )
}
export default App
