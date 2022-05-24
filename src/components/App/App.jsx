import React, { useState, useEffect, useCallback } from 'react'
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

  const onError = (err) => {
    setFilmsList([])
    setError(err.message)
    setLoading(false)
  }

  const setIdToCookie = (dataGuest) => {
    cookie.set('guest_session_id', dataGuest, {
      expires: 31,
    })
    setGuestId(dataGuest)
  }

  const getRated = async (id) => {
    const movies = await apiService.getRatedMovies(id)
    console.log(movies)
    setRatedFilms(movies.results)
  }

  useEffect(() => {
    if (!cookie.get('guest_session_id')) {
      apiService
        .getGuestSessionId()
        .then((res) => setIdToCookie(res.guest_session_id))
    } else {
      setGuestId(cookie.get('guest_session_id'))
    }
  }, [])

  useEffect(() => {
    guestId ? getRated(guestId) : null
  }, [guestId])

  const genreList = async () => {
    setGenres(await apiService.getGenres())
  }

  useEffect(() => {
    genreList()
  }, [])

  const delayedQuery = useCallback(
    debounce((query) => sendQuery(query, pageNumber), 500),
    [pageNumber]
  )

  const sendQuery = useCallback(async (q, pageNum) => {
    if (q === '') {
      onError({ message: '422' })
    } else {
      setLoading(true)
      console.log(q)
      apiService
        .getResourse(q, pageNum)
        .then((res) => {
          setFilmsList([...res.results])
          setLoading(false)
          setError('')
          console.log(pageNum)
          setTotalPages(res.total_pages)
        })
        .catch(onError)
    }
  }, [])

  useEffect(() => {
    delayedQuery(label)
    console.log(label)
    console.log(pageNumber) // (*)
  }, [label, pageNumber, delayedQuery])

  const onLabelChange = (e) => {
    setLabel(e.target.value)
    setLoading(true)
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
  }

  const showTotal = (total) => `Total ${total} pages`

  const spinner = loading ? <Spin size="large" className="spinner" /> : null

  const paginationOnRate = () => {
    if (searhFilter === 'rated') {
      return null
    }
    return (
      <Paginate
        pageNumber={pageNumber}
        onchangePagination={onchangePagination}
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
          getRated={getRated}
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
