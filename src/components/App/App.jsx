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
  // добавление стейта
  const [label, setLabel] = useState('')
  const [dataSearchFilms, setDataSearchFilms] = useState({
    filmsList: [],
    pageNumber: 1,
    totalPages: 0,
  })
  const [dataRatedFilms, setDataRatedFilms] = useState({
    filmsList: [],
    pageNumber: 1,
    totalPages: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searhFilter, setSearhFilter] = useState('search')

  const [genres, setGenres] = useState([])
  const [rating, setRating] = useState({})

  //функция для работы с ошибками

  const onError = (err) => {
    searhFilter === 'rated'
      ? setDataRatedFilms({
          filmsList: [],
          pageNumber: 1,
          totalPages: 0,
        })
      : setDataSearchFilms({
          filmsList: [],
          pageNumber: 1,
          totalPages: 0,
        })
    setError(err.message)
    setLoading(false)
  }

  // Получение рейтингов из LocalStorage

  const getRatingArr = () => {
    const ratedArr = {}
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)

      ratedArr[key] = JSON.parse(localStorage.getItem(key))
    }

    return ratedArr
  }

  useEffect(() => {
    setRating(getRatingArr())
  }, [searhFilter])

  // Получение и установка рейтинговых фильмов

  const getRated = async (id, pn) => {
    setError('')
    setLoading(true)
    const movies = await apiService.getRatedMovies(id, pn)
    console.log(movies)
    setDataRatedFilms({
      filmsList: movies.results,
      pageNumber: movies.page,
      totalPages: movies.total_pages,
    })

    movies.results.forEach((mov) => localStorage.setItem(mov.id, mov.rating))
    setLoading(false)
  }

  useEffect(() => {
    if (searhFilter === 'rated')
      getRated(cookie.get('guest_session_id'), dataRatedFilms.pageNumber)
  }, [searhFilter])

  // Получение и установка ключа гостевой сессии

  useEffect(() => {
    if (!cookie.get('guest_session_id')) {
      apiService
        .getGuestSessionId()
        .then((res) =>
          cookie.set('guest_session_id', res.guest_session_id, { expires: 31 })
        )
    }
  }, [])

  // Получение жанров

  const genreList = async () => {
    setGenres(await apiService.getGenres())
  }

  useEffect(() => {
    genreList()
  }, [])

  // Функция задерки ввода

  const delayedQuery = useCallback(
    debounce((query) => sendQuery(query), 1000),
    []
  )

  const sendQuery = useCallback(async (q) => {
    if (q === '') {
      onError({ message: '422' })
    } else {
      setLoading(true)
      apiService
        .getResourse(q)
        .then((res) => {
          setDataSearchFilms({
            filmsList: [...res.results],
            pageNumber: 1,
            totalPages: res.total_pages,
          })
          setLoading(false)
          setError('')
        })
        .catch(onError)
    }
  }, [])

  // Изменение страницы для поиска по запросу

  const changePage = async (q, pn) => {
    setLoading(true)
    apiService
      .getResourse(q, pn)
      .then((res) => {
        setDataSearchFilms({
          filmsList: [...res.results],
          pageNumber: res.page,
          totalPages: res.total_pages,
        })

        setLoading(false)
        setError('')
      })
      .catch(onError)
  }

  useEffect(() => {
    delayedQuery(label)
  }, [label, delayedQuery])

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
        if (dataSearchFilms.filmsList.length !== 0) {
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

  //Логика изменения страницы
  const onchangePagination = (page) => {
    searhFilter === 'rated'
      ? getRated(cookie.get('guest_session_id'), page)
      : changePage(label, page)
  }

  const showTotal = (total) => `Total ${total} pages`

  // const spinner = loading ? <Spin size="large" className="spinner" /> : null

  return (
    <main>
      <GenresContext.Provider value={genres}>
        <Main
          onchangeFilter={onchangeFilter}
          searhFilter={searhFilter}
          filmsList={dataSearchFilms.filmsList}
          ratedFilms={dataRatedFilms.filmsList}
          getRated={getRated}
          onLabelChange={onLabelChange}
          label={label}
          rating={rating}
        />
      </GenresContext.Provider>

      {loading && <Spin size="large" className="spinner" />}
      {warningMessage(error)}
      <Paginate
        pageNumber={
          searhFilter === 'rated'
            ? dataRatedFilms.pageNumber
            : dataSearchFilms.pageNumber
        }
        onchangePagination={onchangePagination}
        totalPages={
          searhFilter === 'rated'
            ? dataRatedFilms.totalPages
            : dataSearchFilms.totalPages
        }
        showTotal={showTotal}
        error={error}
        filmsList={
          searhFilter === 'rated'
            ? dataRatedFilms.filmsList
            : dataSearchFilms.filmsList
        }
      />
    </main>
  )
}
export default App
