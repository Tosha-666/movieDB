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
  const [searhFilter, setSearhFilter] = useState('search')
  const [ratedFilms, setRatedFilms] = useState([])
  const [genres, setGenres] = useState([])

  const onError = (err) => {
    setFilmsList([])
    setError(err.message)
    setLoading(false)
  }

  const getRated = async (id) => {
    setLoading(true)
    const movies = await apiService.getRatedMovies(id)
    setRatedFilms(movies.results)
    setLoading(false)
  }

  useEffect(() => {
    if (!cookie.get('guest_session_id')) {
      apiService
        .getGuestSessionId()
        .then((res) =>
          cookie.set('guest_session_id', res.guest_session_id, { expires: 31 })
        )
    }
  }, [])

  useEffect(() => {
    if (searhFilter === 'rated') getRated(cookie.get('guest_session_id'))
  }, [searhFilter])

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
      apiService
        .getResourse(q, pageNum)
        .then((res) => {
          setFilmsList([...res.results])
          setLoading(false)
          setError('')
          setTotalPages(res.total_pages)
        })
        .catch(onError)
    }
  }, [])

  useEffect(() => {
    delayedQuery(label)
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
        if (searhFilter === 'search') {
          return (
            <Alert message="Enter text to search" type="warning" closable />
          )
        }
        return null
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
